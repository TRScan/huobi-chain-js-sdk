const { join } = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  testTimeout: 600000,
  globalSetup: join(__dirname, 'jest.setup.js'),
};
