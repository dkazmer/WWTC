// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			PASS: string;
		}
	}

	namespace DB {
		type Table = 'registration' | `reg202${4 | 5 | 6}`;
	}
}

export {};
