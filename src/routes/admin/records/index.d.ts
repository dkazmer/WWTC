export type Stats = { [K in 'total' | 'numAdults' | 'numJuniors' | 'paidAdults' | 'paidJuniors']: number };
export type { Schema, TableDB } from '$lib/server/db/schema';
