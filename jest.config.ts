import type { Config } from '@jest/types';

export default <Config.InitialOptions>{
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/__tests__/tsconfig.json',
    },
  },
};
