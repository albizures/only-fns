import glob from "tiny-glob";
import path from "node:path";
import { Options } from "tsup";
import { defineConfig } from "tsup";

const common: Options = {
  format: ["esm", "cjs"],
  sourcemap: process.env.NODE_ENV !== "production",
  dts: true,
  clean: true,
  splitting: true,
  target: "esnext",
  treeshake: true,
  bundle: false,
};

export default defineConfig(async () => {
  const files = await glob("src/**/!(*.examples).ts");

  return files.map((file) => {
    const dirname = path.dirname(file);
    const outDir = path.join("dist", path.relative("src", dirname));

    return {
      ...common,
      entry: [file],
      outDir,
    };
  });
});
