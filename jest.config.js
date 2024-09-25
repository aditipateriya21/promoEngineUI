export default {
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    },
  };
  