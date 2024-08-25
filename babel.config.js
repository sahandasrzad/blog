module.exports = function (api) {
  // Check if the environment is "test"
  const isTest = api.env('test');

  // Only apply caching in non-test environments
  if (!isTest) {
    api.cache(true);
  }

  // Choose presets based on the environment
  const presets = isTest
    ? ["@babel/preset-env", "@babel/preset-react"]  // Use these presets in test environment
    : ["next/babel"];  // Use these presets in other environments

  return {
    presets,
  };
};