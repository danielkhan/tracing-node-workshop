module.exports.metrics = (collector, handle, serviceName) => {
  const statsd = require('appmetrics-statsd').StatsD(
    { host: collector, prefix: `${handle}_${serviceName}_` }
  );

  const middleware = (req, res, next) => {
    var startTime = new Date().getTime();
    console.log(req.headers);
    // Function called on response finish that sends stats to statsd
    function sendStats() {
      var key = 'http-express-';

      // Status Code
      var statusCode = res.statusCode || 'unknown_status';
      statsd.increment(key + 'status_code.' + statusCode);

      // Response Time
      var duration = new Date().getTime() - startTime;
      statsd.timing(key + 'response_time', duration);

      cleanup();
    }

    // Function to clean up the listeners we've added
    function cleanup() {
      res.removeListener('finish', sendStats);
      res.removeListener('error', cleanup);
      res.removeListener('close', cleanup);
    }

    // Add response listeners
    res.once('finish', sendStats);
    res.once('error', cleanup);
    res.once('close', cleanup);

    if (next) {
      next();
    }
  }

  const JaegerTraceExporter = require('@opencensus/exporter-jaeger').JaegerTraceExporter;
  const tracing = require('@opencensus/nodejs');
  const options = {
    serviceName: `${handle}_${serviceName}`,
    host: collector,
  }
  const exporter = new JaegerTraceExporter(options);
  const propagation = require('@opencensus/propagation-tracecontext');
  const traceContext = new propagation.TraceContextFormat();
  tracing.start({ exporter, propagation: traceContext });

  return {
    statsd,
    middleware,
    tracing,
  }
};
