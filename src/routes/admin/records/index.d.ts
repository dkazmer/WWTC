// export type Gender = 'm' | 'f' | 'o';
// export type Age = 'a' | 'j';
// export type List = ({ [K in ListKeys]: string } & { gender: Gender; ageGroup: Age })[];
export type Stats = { [K in 'total' | 'numAdults' | 'numJuniors' | 'paidAdults' | 'paidJuniors']: number };
export type { TableDB } from './+page.server.js';

// type ListKeys =
// 	| 'id'
// 	| 'firstName'
// 	| 'lastName'
// 	| 'email'
// 	| 'phone'
// 	| 'phone_sec'
// 	| 'address'
// 	| 'postal'
// 	| 'date'
// 	| 'lessons'
// 	| 'season'
// 	| 'type'
// 	| 'bType'
// 	| 'numApplicants'
// 	| 'owing'
// 	| 'paid';
