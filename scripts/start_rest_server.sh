#!/bin/bash
docker-compose exec enigmadev \
  enigmacli rest-server \
  --node tcp://localhost:26657 \
  --trust-node \
  --laddr tcp://0.0.0.0:1317