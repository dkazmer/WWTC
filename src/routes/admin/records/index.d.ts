export type Stats = { [K in 'total' | 'numAdults' | 'numJuniors' | 'paidAdults' | 'paidJuniors']: number };
export type { Schema, TableDB } from '$lib/server/db/schema';
export type Pairing<T extends string | number = string> = Record<'id' | 'ow', T>;
export type PairingMap = Map<string, Pairing>;
