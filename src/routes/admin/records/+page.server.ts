import { fail } from '@sveltejs/kit';
import { inArray, sql } from 'drizzle-orm';
import { drizzle, type MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import { getTable, type TableDB, type Schema } from '$lib/server/db/schema';
import { tryCatch } from '$lib/try-catch.js';
import type { Pairing } from '.';

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
		const tableLocal = getTable(formData.get('table') as DB.TableName);
		const pairings = create.pairings(formData);
		// console.log('>> pairings', pairings);

		const sqlChunks = create.sqlChunks(tableLocal as Schema, pairings);
		const finalSql = sql.join(sqlChunks, sql.raw(' '));

		const { data, error } = await tryCatch(
			db
				.update(tableLocal)
				.set({
					owing: 0,
					paid: finalSql
				} as unknown as Partial<TableDB>)
				.where(
					inArray(
						tableLocal.id,
						pairings.map(p => p.id)
					)
				)
		);

		if (error) {
			// console.log('>> error', error);
			const { message, cause } = error;
			return fail(400, { message, cause });
		}

		// console.log('>> data', data);
		return { ...data[0] };
	}
};

namespace create {
	export function pairings(formData: FormData): Pairing<number>[] {
		const pairs: Pairing<number>[] = [];

		formData.forEach((value, key) => {
			console.log('>> each', key, value);
			if (key === 'table') return;

			pairs.push({
				id: parseInt(key as string, 10),
				ow: parseInt(value as string, 10)
			});
		});

		return pairs;
	}

	export function sqlChunks(table: Schema, pairings: Pairing<number>[]) {
		const sqlChunks = [sql`(case`];

		for (const { id, ow } of pairings) {
			sqlChunks.push(sql`when ${table.id} = ${id} then ${ow}`);
		}

		sqlChunks.push(sql`end)`);

		return sqlChunks;
	}
}
