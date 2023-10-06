import type { Config } from 'jest';

const config: Config = {
	testEnvironment: 'node',
	globalSetup: '<rootDir>/src/test/globalSetup.ts',
	globalTeardown: '<rootDir>/src/test/globalTeardown.ts',
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],

	transform: {
		'^.+\\.ts$': '@swc/jest',
	},
};

export default config;
