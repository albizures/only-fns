import { test, expect } from "vitest";
import { outItem } from "./filter";

test("filter out item", () => {
  const primitiveList: number[] = [1, 2, 3, 4];

  interface Foo {
    test: number;
  }

  const objectList: Foo[] = [{ test: 1 }, { test: 2 }, { test: 3 }];

  const item = objectList[1];

  primitiveList.filter(outItem(2));
  objectList.filter(outItem(item));

  expect(primitiveList.filter(outItem(2))).not.toContain(2);
  expect(objectList.filter(outItem(item))).not.toContain(item);
});
