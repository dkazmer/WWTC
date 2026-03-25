import { sql } from 'drizzle-orm';
import {
	mysqlTable,
	mysqlSchema,
	AnyMySqlColumn,
	int,
	varchar,
	datetime,
	mysqlEnum,
	smallint,
	tinyint
} from 'drizzle-orm/mysql-core';

export const reg2024 = mysqlTable('reg2024', {
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

export const reg2025 = mysqlTable('reg2025', {
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

export const reg2026 = mysqlTable('reg2026', {
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

export const registration = mysqlTable('registration', {
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
