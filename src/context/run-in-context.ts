// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RunInContext {
	//
}

type Context = RunInContext extends {
	context: infer T;
}
	? T
	: unknown;

type InContextFn<T> = () => T;

type ContextUtils<T> = [
  getContext: () => T,
  inContext: <R>(context: T, fn: InContextFn<R>) => R,
];

export function createContext<T>(context?: T): ContextUtils<T> {
	function getContext() {
		if (!context) {
			throw new Error('out of context');
		}

		return context;
	}

	function inContext<R>(newContext: T, fn: InContextFn<R>) {
		const oldContext = context;

		context = newContext;

		const result = fn();

		context = oldContext;

		return result;
	}

	return [getContext, inContext];
}

export const [getContext, inContext] = createContext<Context>();
