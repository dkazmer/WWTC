// biome-ignore-all lint/suspicious/noExplicitAny: allow `any`
import type { Temporal as Tmp } from '@js-temporal/polyfill';
import type { rates as ratesObj } from '$lib/constants';

// @ts-expect-error (ts2339): "Property 'Temporal' does not exist on type"
const { Temporal } = 'Temporal' in globalThis ? globalThis : await import('@js-temporal/polyfill');
const { Now, PlainDate: TPD } = Temporal;

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

	if (TPD.compare(now, fall) >= 0) return rates.fall;
	if (TPD.compare(now, regular) >= 0) return rates.regular;
	return rates.earlyBird;
}

declare global {
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
