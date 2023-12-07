import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: [
		{
			input: './src',
			pattern: ['**/*.ts', '!(*test).ts'],
			format: 'cjs',
			builder: 'mkdist',
		},
		{
			input: './src',
			pattern: ['**/*.ts', '!(*test).ts'],
			format: 'esm',
			builder: 'mkdist',
		},
	],
	declaration: true,
	clean: true,
});
