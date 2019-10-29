const karmaBaseConfig = require('./karma.config.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/transformer/**/methods.test.ts');

    config.set(karmaConfig);
};
