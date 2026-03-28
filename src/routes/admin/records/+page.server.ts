// import { fail, json } from '@sveltejs/kit';
// import { eq } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import { getDB } from '$lib/server/db/schema';

const db = drizzle(DATABASE_URL);
const tableDefault = getDB('reg2026');

export const load = async ({ request }) => {
	const { searchParams } = new URL(request.url);
	const tableName = searchParams.get('db') as DB.TableName;
	const tableLocal = tableName ? getDB(tableName) : tableDefault;

	console.log('>> load', request);
	const response = await db.select().from(tableLocal); //.where(eq(table.id, 1));

	return { response };
};

export const actions = {
	async default({ request }) {
		const formData = await request.formData();
		console.log('>> formData', formData);
	}
};

export type TableDB = InferSelectModel<typeof tableDefault>;
