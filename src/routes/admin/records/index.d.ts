export type Stats = { [K in 'total' | 'numAdults' | 'numJuniors' | 'paidAdults' | 'paidJuniors']: number };
export type { TableDB } from '$lib/server/db/schema';
