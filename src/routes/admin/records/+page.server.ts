// import { fail, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import { getTable, type TableDB } from '$lib/server/db/schema';

const db = drizzle(DATABASE_URL);
const defaultTable = getTable('reg2026');

export const load = async ({ request }) => {
	const { searchParams } = new URL(request.url);
	const tableName = searchParams.get('db') as DB.TableName;
	const tableLocal = tableName ? getTable(tableName) : defaultTable;
	const response = await db.select().from(tableLocal); //.where(eq(table.id, 1));

	return { response };
};

export const actions = {
	async paid({ request }) {
		const formData = await request.formData();
		console.log('>> paid', formData);
		// for (const prop in formData) {
		// 	console.log('>> prop', prop);
		// }
		formData.forEach((_value, key) => {
			console.log('>> each', key);
			// db.update(defaultTable).set({
			// 	owing: 0,
			// 	paid: 123
			// } as unknown as Partial<TableDB>).where(eq(defaultTable.id, parseInt(key, 10)))
		});
	}
};
