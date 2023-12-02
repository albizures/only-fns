import { expect, it } from 'vitest';
import { createContext, getContext, inContext } from './run-in-context';

declare module './run-in-context' {

	// eslint-disable-next-line ts/consistent-type-definitions
	interface RunInContext {
		context: {
			foo: string
		}
	}
}

it('run in context', () => {
	const context1 = {
		foo: 'test 1',
	};
	const context2 = {
		foo: 'test 2',
	};
	const context3 = {
		foo: 'test 3',
	};

	inContext(context1, () => {
		expect(getContext()).toBe(context1);

		inContext(context2, () => {
			expect(getContext()).toBe(context2);

			inContext(context3, () => {
				expect(getContext()).toBe(context3);
			});

			expect(getContext()).toBe(context2);
		});

		expect(getContext()).toBe(context1);
	});
});

it('create context', () => {
	type Context = {
		custom: number
	};

	const [getContext, inContext] = createContext<Context>();

	const context1 = {
		custom: 1,
	};
	const context2 = {
		custom: 2,
	};
	const context3 = {
		custom: 3,
	};

	inContext(context1, () => {
		expect(getContext()).toBe(context1);

		inContext(context2, () => {
			expect(getContext()).toBe(context2);

			inContext(context3, () => {
				expect(getContext()).toBe(context3);
			});

			expect(getContext()).toBe(context2);
		});

		expect(getContext()).toBe(context1);
	});
});
