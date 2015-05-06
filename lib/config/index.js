'use strict';

var Secrets = require('./secrets');
var env = process.env.NODE_ENV || 'development';

var common = {
  FIREBASE_SECRET: Secrets.FIREBASE_SECRET,
  FIREBASE_EXPIRE: 24
};

var environments = {
  development: {
    PORT: 8000,
    MONGO_URL: 'mongodb://localhost/roadtrip-dev'
  },
  test: {
    PORT: 0,
    MONGO_URL: 'mongodb://localhost/roadtrip-test'
  },
  production: {
    PORT: 8000,
    MONGO_URL: 'mongodb://localhost/roadtrip-prod'
  }
};

var environment = environments[env];

Object.keys(common).forEach(function(key){
  environment[key] = common[key];
});

exports.environment = environment;
