module.exports = {
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testEnvironment: "node"
  };