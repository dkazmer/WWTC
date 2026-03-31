// import { sql } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';
import {
	// mysqlSchema,
	// type AnyMySqlColumn,
	datetime,
	int,
	mysqlEnum,
	mysqlTable,
	smallint,
	tinyint,
	varchar
} from 'drizzle-orm/mysql-core';

export function getTable<T extends DB.TableName>(db: T) {
	if (db === 'reg2023')
		return mysqlTable('registration', {
			id: int().autoincrement().notNull(),
			firstName: varchar({ length: 50 }).notNull(),
			lastName: varchar({ length: 50 }).notNull(),
			email: varchar({ length: 50 }).notNull().unique(),
			phone: varchar({ length: 12 }).notNull(),
			phoneSec: varchar('phone_sec', { length: 12 }).notNull(),
			address: varchar({ length: 1000 }).notNull(),
			date: datetime({ mode: 'string' }).default('current_timestamp()').notNull(),
			gender: mysqlEnum(['m', 'f', 'o']).notNull(),
			ageGroup: mysqlEnum(['j', 's', 'a']).notNull(),
			lessons: mysqlEnum(['none', 'private', 'public']).notNull(),
			season: smallint().notNull(),
			type: mysqlEnum(['family', 'solo']).default('solo').notNull(),
			bType: mysqlEnum(['new', 'returning']).default('new').notNull(),
			numApplicants: tinyint().default(1).notNull(),
			owing: smallint().notNull()
		});

	return mysqlTable(db, {
		id: int().autoincrement().notNull(),
		firstName: varchar({ length: 50 }).notNull(),
		lastName: varchar({ length: 50 }).notNull(),
		email: varchar({ length: 50 }).notNull().unique(),
		phone: varchar({ length: 12 }).notNull(),
		phoneSec: varchar('phone_sec', { length: 12 }).notNull(),
		address: varchar({ length: 1000 }).notNull(),
		postal: varchar({ length: 7 }).notNull(),
		date: datetime({ mode: 'string' }).default('current_timestamp()').notNull(),
		gender: mysqlEnum(['m', 'f', 'o']).notNull(),
		ageGroup: mysqlEnum(['j', 's', 'a']).notNull(),
		lessons: mysqlEnum(['none', 'private', 'public']).notNull(),
		season: smallint().notNull(),
		type: mysqlEnum(['family', 'solo']).default('solo').notNull(),
		bType: mysqlEnum(['new', 'returning']).default('new').notNull(),
		numApplicants: tinyint().default(1).notNull(),
		owing: smallint().notNull(),
		paid: smallint().notNull()
	});
}

export type TableDB = InferSelectModel<ReturnType<typeof getTable<'reg2026'>>> & { [K in 'postal' | 'paid']: string };
