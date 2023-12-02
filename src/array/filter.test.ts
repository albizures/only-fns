import { expect } from 'vitest';
import { outItem } from './filter';

it('filter out item', () => {
	const primitiveList: Array<number> = [1, 2, 3, 4];

	type Foo = {
		test: number
	};

	const objectList: Array<Foo> = [{ test: 1 }, { test: 2 }, { test: 3 }];

	const item = objectList[1];

	primitiveList.filter(outItem(2));
	objectList.filter(outItem(item));

	expect(primitiveList.filter(outItem(2))).not.toContain(2);
	expect(objectList.filter(outItem(item))).not.toContain(item);
});
