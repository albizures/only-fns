export type Ok<TValue> = {
	ok: true
	value: TValue
};

export type Err<TError> = {
	ok: false
	value: TError
};

export type Result<TValue, TError> = Ok<TValue> | Err<TError>;

export function Ok<TValue>(value: TValue): Result<TValue, never> {
	return {
		value,
		ok: true,
	};
}

export function Err<TError>(error: TError): Result<never, TError> {
	return {
		value: error,
		ok: false,
	};
}

export function unwrap<TValue, TError>(result: Result<TValue, TError>): TValue {
	if (result.ok) {
		return result.value;
	}

	throw result.value;
}

export function expect<TValue, TError, TMessage>(result: Result<TValue, TError>, message: TMessage): TValue {
	if (result.ok) {
		return result.value;
	}

	throw typeof message === 'string' ? new Error(message) : message;
}

export async function to<TValue, TError = unknown>(promise: Promise<TValue>): Promise<Result<TValue, TError>> {
	try {
		const data = await promise;

		return Ok(data);
	}
	catch (error) {
		return Err(error as TError);
	}
}

type Mapper<TValue, TResult extends Result<any, any>> = (value: TValue) => TResult;

export function and<
	TValue,
	TError,
	TNewValue = TValue,
	TNewError = TError,
>(
	result: Result<TValue, TError>,
	fn: Mapper<TValue, Result<TNewValue, TNewError>>,
): Err<TError> | Result<TNewValue, TNewError> {
	if (result.ok) {
		return fn(result.value);
	}

	return result;
}

export function next<
	TValue,
	TResult extends Result<any, any>,
>(
	nextFn: (value: TValue) => TResult | Promise<TResult>,
	message?: string,
) {
	return async <TError>(result: Result<TValue, TError>) => {
		if (result.ok) {
			const nextResult = await nextFn(result.value);

			if (!nextResult.ok) {
				if (message) {
					return Err(new Error(message));
				}
			}

			return nextResult;
		}

		return result;
	};
}

export const r = {
	ok: Ok,
	err: Err,
	unwrap,
	expect,
	to,
	and,
	next,
};
