export const season = 2026;

export const keyDates = Object.freeze({
	// date formats must be ISO8601 standard
	regular: '2026-03-01' as ISO8601,
	fall: '2026-08-15' as ISO8601
});

export const rates = {
	adult: {
		earlyBird: 80,
		regular: 90,
		fall: 50
	},
	junior: 35
} as const;
