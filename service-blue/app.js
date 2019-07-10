require('dotenv').config({ path: '../.env' });

const tracing = require('@opencensus/nodejs');
const JaegerTraceExporter = require('@opencensus/exporter-jaeger').JaegerTraceExporter;

const options = {
  serviceName: 'express-frontend',
  tags: [process.env.MY_HANDLE],
  host: process.env.COLLECTOR,
}
const exporter = new JaegerTraceExporter(options);
tracing.start({ exporter });

const statsdpfx = `${process.env.MY_HANDLE}_service-blue_`;
const statsd = require('appmetrics-statsd').StatsD(
  { host: process.env.COLLECTOR, prefix: statsdpfx }
);

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/votes-${process.env.MY_HANDLE}?retryWrites=true&w=majority`);
const indexRouter = require('./routes/index');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
