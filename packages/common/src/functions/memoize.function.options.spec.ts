import { describe, expect, it } from 'vitest';
import {
	normalizeMemoizeOptions,
	type MemoizeOptions,
	type NormalizedMemoizeOptions,
} from './memoize.function.options.js';

describe('normalizeMemoizeOptions', () => {
	it('should have a default when not defined', () => {
		expect(normalizeMemoizeOptions()).toEqual({
			argHasher: JSON.stringify,
			maxCacheEntries: 10,
		} as NormalizedMemoizeOptions<unknown>);
	});

	it('should use the provided values when defined', () => {
		const manualOptions: MemoizeOptions<unknown> = {
			argHasher: (_s) => 'hash',
			maxCacheEntries: 2,
			thisContext: {},
		};
		expect(normalizeMemoizeOptions(manualOptions)).toEqual(manualOptions);
	});
});
