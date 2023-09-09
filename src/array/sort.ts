export function compareBy<T, A extends keyof T>(property: A) {
	return (a: T, b: T) => {
		if (a[property] < b[property]) {
			return -1;
		}

		if (a[property] > b[property]) {
			return 1;
		}

		return 0;
	};
}
