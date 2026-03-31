import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import { getTable, type TableDB } from '$lib/server/db/schema';
import { tryCatch } from '$lib/try-catch.js';
import { fail } from '@sveltejs/kit';

const db = drizzle(DATABASE_URL);
const defaultTable = getTable('reg2026');

export const actions = {
	async default({ request }) {
		// @ts-expect-error (ts2740): missing props
		const formattedData: TableDB = {};
		const formData = await request.formData();
		const additionalFamily = insertFamily(formData);

		formData.forEach((value, key) => {
			if (key.includes('[')) return;

			// biome-ignore format: compact
			switch (key) {
				case 'phone_sec': formattedData.phoneSec = value as string; break;
				case 'street': formattedData.address = value as string; break;
				case 'city': formattedData.address += `, ${value}` as string; break;
				case 'postalCode': formattedData.postal = value as string; break;
				case 'owing': formattedData.owing = parseInt(value as string, 10); break;
				case 'send-money': break;
				// @ts-expect-error (ts7053): can't use `string` to index...
				default: formattedData[key] = value;
			}
		});

		formattedData.numApplicants = additionalFamily.length + 1;
		console.log('>> formattedData', formattedData, additionalFamily);

		const { data, error } = await tryCatch(db.insert(defaultTable).values(formattedData));

		if (error) return fail(400, { message: error.message, cause: error.cause });

		// insert additional family
		// additionalFamily.forEach(member => {
		// 	db.insert(defaultTable).values(member);
		// });

		// send email
	}
};

function insertFamily(formData: FormData) {
	const arr = [];

	for (let i = 1; i <= 5; i++) {
		// biome-ignore format: compact
		formData.get(`firstName[${i}]`) && arr.push({
			firstName: formData.get(`firstName[${i}]`),
			lastName: formData.get(`lastName[${i}]`),
			gender: formData.get(`gender[${i}]`),
			ageGroup: formData.get(`ageGroup[${i}]`)
		} as TableDB);
	}

	return arr;
}
