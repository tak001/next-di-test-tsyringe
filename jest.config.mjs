module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.tsx',
    '<rootDir>/pages/**/*.tsx',
    '<rootDir>/application/**/*.ts',
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};
