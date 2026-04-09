import { fail, redirect, type Cookies } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import { getTable, type TableDB } from '$lib/server/db/schema';
import { tryCatch } from '$lib/try-catch.js';
import { send } from './email.js';

const db = drizzle(DATABASE_URL);
const defaultTable = getTable('reg2026');

export const actions = {
	async default({ request, cookies }) {
		// @ts-expect-error (ts2740): missing props
		const formattedData: TableDB = {};
		const formData = await request.formData();
		const additionalFamily = family(formData);

		formData.forEach((value, key) => {
			if (key.includes('[')) return;

			// biome-ignore format: compact
			switch (key) {
				case 'phone_sec': formattedData.phoneSec = value as string; break;
				case 'street': formattedData.address = value as string; break;
				case 'city': formattedData.address += `, ${value}` as string; break;
				case 'postalCode': formattedData.postal = value as string; break;
				case 'returning': formattedData.bType = value as TableDB['bType']; break;
				case 'owing': formattedData.owing = parseInt(value as string, 10); break;
				case 'send-money': break;
				// @ts-expect-error (ts7053): can't use `string` to index...
				default: formattedData[key] = value;
			}
		});

		formattedData.numApplicants = additionalFamily.length + 1;
		// console.log('>> formattedData', formattedData, additionalFamily);

		const { error } = await insert(formattedData, additionalFamily);
		if (error) {
			console.log('>> insert error', error);
			const { message, cause } = error;
			return fail(400, { error: { message, cause } });
		}

		return email(formattedData, cookies);
	}
};

function family(formData: FormData) {
	const arr = [];

	for (let i = 1; i <= 5; i++) {
		// biome-ignore format: compact
		formData.get(`firstName[${i}]`) && arr.push({
			firstName: formData.get(`firstName[${i}]`),
			lastName: formData.get(`lastName[${i}]`),
			ageGroup: formData.get(`ageGroup[${i}]`),
			gender: formData.get(`gender[${i}]`)
		} as TableDB);
	}

	return arr;
}

async function insert(formattedData: TableDB, additionalFamily: TableDB[]) {
	// check existing
	const existingUser = await db.select().from(defaultTable).where(eq(defaultTable.email, formattedData.email)).limit(1);
	if (existingUser.length) return { error: new Error('Email has aleady been registered.') };

	// insert
	const x = additionalFamily.length ? [formattedData, ...additionalFamily] : formattedData;
	// @ts-expect-error (ts2769): apparent type mismatch
	const { data, error } = await tryCatch(db.insert(defaultTable).values(x));
	if (error) return { error };

	return { data, error: null };
}

async function email(formattedData: TableDB, cookies: Cookies) {
	const { data, error } = await tryCatch(send(formattedData));
	console.log('>> emailResponse', data, error);

	cookies.set('registered', 'true', {
		path: '/membership',
		httpOnly: false,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 // 1 minute (unit: seconds)
	});

	throw redirect(303, `/membership?registered${error ? '&noemail' : ''}`);

	// should never go beyond this point: registration is already successful, simply redirect with message about whether confirmation email was sent or not
	// const { code, command, response, responseCode } = error as unknown as App.Error['Response'];
	// if (code !== 'EENVELOPE') return { error: { response: 'unknown error' } };
	// return fail<{ error: App.Error['Response'] }>(responseCode, { error: { code, command, response, responseCode } });
}
