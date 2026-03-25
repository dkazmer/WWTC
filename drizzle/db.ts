import { drizzle } from 'drizzle-orm/mysql2';
import { reg2026 } from './schema';

const db = drizzle(process.env.DATABASE_URL);

const _response = await db.select().from(reg2026);

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
		}
	}
}
