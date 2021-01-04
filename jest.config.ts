export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/__tests__/tsconfig.json',
    },
  },
};
