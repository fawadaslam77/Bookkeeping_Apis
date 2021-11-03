var config = {};

config.twilio = {
  sid: 'AC4a295b8f11a17c356abc8be9b542ab72',
  token: 'ff886b687657d55647dc83433efad40e',
  from: '+12695337057',
};
config.redis = {};
config.web = {};

config.privateKey = 'Hisab_3377';
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;
