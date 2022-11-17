// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/$1',
  },
  cacheDirectory: '<rootDir>/temp/cache/jest',
  slowTestThreshold: 20,
  testEnvironment: 'node',
  testTimeout: 30000,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.|*-)+(spec|test).[jt]s?(x)'],
};
