# Installing the services

`git clone ...`

Create 4 terminal windows.
Change in each directory and run `npm install` followed by `npm start`.

Copy `.env-sample` to `.env`.

Change MY_HANDLE.
Set DB Password.

Run all services

# Collecting metrics

# Install metrics tooling

## Telegraf and InfluxDB
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list

## InfluxDB

sudo apt-get update && sudo apt-get install influxdb
sudo systemctl unmask influxdb.service
service influxdb start

## Telegraf

sudo apt-get update && sudo apt-get install telegraf
service telegraf start

/etc/telegraf/telegraf.conf
Uncomment statsd
Restart telegraf


## Grafana
sudo apt install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo apt update
sudo apt install -y grafana

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
