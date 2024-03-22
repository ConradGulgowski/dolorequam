import type { Awaitable } from '@alexaegis/common';
import type { Options } from 'prettier';
import { normalizePrettifyOptions, type PrettifyOptions } from './try-prettify.function.options.js';

/**
 * @returns a function that formats strings with prettier
 */
export const getPrettierFormatter = async (
	rawOptions?: PrettifyOptions,
): Promise<(content: string) => Awaitable<string>> => {
	const options = normalizePrettifyOptions(rawOptions);

	try {
		const prettier = await import('prettier');

		const prettierConfig = await prettier.resolveConfig(options.cwd, {
			editorconfig: true,
		});

		const prettierOptions: Options = {
			...prettierConfig,
			parser: options.parser,
		};

		return async (content) => {
			try {
				return await prettier.format(content, prettierOptions);
			} catch (error) {
				options.logger.error('prettier format failed', error);
				return content;
			}
		};
	} catch (error) {
		options.logger.warn('loading prettier failed', error);
		return (content) => content;
	}
};
