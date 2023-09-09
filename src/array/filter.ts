export function outItem<T>(item: T) {
	return (current: T) => {
		return item !== current;
	};
}
