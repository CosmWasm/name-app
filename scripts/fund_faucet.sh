#!/bin/bash
docker-compose exec enigmadev \
  enigmacli tx send b enigma1pkptre7fdkl6gfrzlesjjvhxhlc3r4gm277l4c 10000000000uscrt -y \
  --keyring-backend test