module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  