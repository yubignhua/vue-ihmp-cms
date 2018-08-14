'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  //BASE_API: '"http://192.168.2.40:8000"'
  BASE_API: '"https://biztest.chunyu.me"'
})
