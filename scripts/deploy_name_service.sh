#!/bin/bash
INIT="{\"purchase_price\": {\"denom\": \"uscrt\",\"amount\": \"2000000\"},\"transfer_price\": {\"denom\": \"uscrt\",\"amount\": \"1000000\"}}"
docker-compose exec enigmadev \
  enigmacli tx compute instantiate 1 "$INIT" --from a --keyring-backend test --label "my name service" -y \
  --keyring-backend test