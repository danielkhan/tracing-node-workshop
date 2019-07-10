This repository contains material for my workshop Tracing Node.

# Setting up all services
1. Clone the repository `git clone git@github.com:danielkhan/tracing-node-workshop.git`.
2. Copy `/.env-sample` to `/.env`.
3. Fill in the information provided.
4. Create 4 terminal windows.
5. In each window, change into a service and run `npm install` followed by `npm start`.
6. Create one more window, change into `/monitoring` and run `npm install` there as well.


# Collecting metrics
To collect metrics, we need a server that contains services for receiving metrics
as well as some user interface.
For this workshop, this server exists already.

This provides the following services for our metrics monitoring solution:
- Telegraf: A dameon that can collect different kind of data and provides a statsd endpoint
- InfluxDB: A timeseries database
- Grafana: A user interface that lets us create dashboards from different datasources

# Install Jaeger Tracing

```bash
$ docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.13
```

Frontend `http://tracing.khan.io:16686`.

![Jaeger Architecture](./assets/jaeger-architecture.png "Jaeger Architecture")
