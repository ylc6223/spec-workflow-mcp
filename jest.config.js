export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  projects: [
    '<rootDir>/packages/core/jest.config.js',
    '<rootDir>/packages/dashboard-backend/jest.config.js',
    '<rootDir>/packages/spec-workflow-mcp/jest.config.js'
  ]
};