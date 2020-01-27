module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  watchPathIgnorePatterns: [
    '<rootDir>/src/'
  ],
  testRegex: 'tests/.*\\.spec\\.(ts|tsx|js)',
  clearMocks: true,
  transform: {
    '^.+\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\.(ts|tsx)$': 'ts-jest'
  },
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ]
};
