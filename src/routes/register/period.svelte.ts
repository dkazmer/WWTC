// Determine period of the season, based on which we can narrow adult rate
import type { Temporal as Tmp } from '@js-temporal/polyfill';
import type { rates as ratesObj } from '$lib/constants';

globalThis.Temporal = globalThis.Temporal || (await import('@js-temporal/polyfill')).Temporal;

// biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: declared in global types
const TPD = Temporal.PlainDate;
// biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: declared in global types
const { Now } = Temporal;

/**
 * Narrow the rate based on the date.
 * @param dates object of ISO dates based on season periods
 * @param rates object of rates based on season periods
 * @returns number (specific adult rate)
 */
export function determine(
	dates: {
		regular: ISO8601;
		fall: ISO8601;
	},
	rates: typeof ratesObj.adult
): Rates {
	const now = Now.plainDateISO();
	const regular = TPD.from(dates.regular);
	const fall = TPD.from(dates.fall);

	if (Temporal.PlainDate.compare(now, fall) >= 0) return rates.fall;
	if (Temporal.PlainDate.compare(now, regular) >= 0) return rates.regular;
	return rates.earlyBird;
}

declare global {
	var Temporal: Temporal;

	type TemporalInstance = InstanceType<Temporal['PlainDate']>;
	type Temporal = { [K in keyof typeof Tmp]: (typeof Tmp)[K] };

	type Fn<T = void, U = any> = (...args: U[]) => T;
	type Constructor<T, U = any> = new (...args: U[]) => T;
	type Primitive = string | number | symbol;
	type Brand<T, U extends string> = T & { [brand]: U };

	type ISO8601 = Brand<string, 'ISO8601'>;
	type Rates = (typeof ratesObj.adult)[keyof typeof ratesObj.adult];
}

declare const brand: unique symbol;
