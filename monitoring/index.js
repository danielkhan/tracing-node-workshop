module.exports.metrics = (host, prefix) => {
  const statsd = require('appmetrics-statsd').StatsD(
    { host, prefix }
  );
  return {
    statsd,
  }
};
