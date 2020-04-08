This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this locally against a demo blockchain, you need to set up a few things:

## Set up local servers....

Start enigmadev:

```sh
docker-compose up
```

Start the rest-server

```sh
./scripts/start_rest_server.sh
```

Fund the faucet

```sh
./scripts/start_rest_server.sh
```

Deploy the contract

```sh
./scripts/deploy_name_service.sh
```

A faucet to provide initial tokens ([see README](https://github.com/CosmWasm/cosmwasm-js/tree/master/packages/faucet)):
NB [WIP for Enigma faucet](https://github.com/levackt/cosmwasm-js/pull/1)

```sh
cd cosmwasm-js
cd packages/faucet
yarn dev-start
```

## Available Scripts

In the project directory, you can run:

### `yarn start:local`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
