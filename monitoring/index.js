module.exports.statsd = (host, prefix) => {
  const statsd = require('appmetrics-statsd').StatsD(
    { host, prefix }
  );


  return {
    statsd,
  }

  return statsd;
};