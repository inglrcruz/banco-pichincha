import type { Config } from 'jest';

const config: Config = {
  collectCoverage: false,
  collectCoverageFrom: ["src/**/**.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  }
};

export default config;