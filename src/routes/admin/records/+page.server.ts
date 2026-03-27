// import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import { getDB } from '$lib/server/db/schema';

const db = drizzle(DATABASE_URL);

const table = getDB('reg2026');
// @-ts-expect-error
const response = await db.select({ id: 1 }).from(table);

console.log('>> db', response);

export const actions = {
	async default({ request }) {
		const formData = await request.formData();
		console.log('>> formData', formData);
	}
};
