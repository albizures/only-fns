export interface OkResult<D> {
	ok: true;
	data: D;
}
export interface FailResult<E = unknown> {
	ok: false;
	error: E;
}

export type Result<D, E = unknown> = OkResult<D> | FailResult<E>;

export function okResult<D>(data: D): OkResult<D> {
	return {
		ok: true,
		data,
	};
}

export function failResult<E>(error: E): FailResult<E> {
	return {
		ok: false,
		error,
	};
}

export async function to<D, E = unknown>(
	promise: Promise<D>,
): Promise<Result<D, E>> {
	try {
		const data = await promise;

		return okResult(data);
	} catch (error) {
		return failResult(error as E);
	}
}

