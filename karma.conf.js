module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'tests/*.js'
    ],
    reporters: ['progress'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity,
    singleRun: true,
    browsers: ['ChromeHeadless']    
  });
};
