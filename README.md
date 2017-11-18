# orz
- Oauth on Rainbow via ZeroMQ
- Support RPC
- Support GraphQL+RPC
- Support service discovery
- Support Authentication https://github.com/msealand/zmq-zap.node
- Support Authorization
- Support REST+RPC

## Overview
```
Content ---[query/mutation]---> Broker ---> Worker
```

## Run
```
# Config, copy and mod to suite your need
cp .env.example .env

# Start broker
yarn install && yarn start
```

## Optional
```
# Start mongo
yarn run mongo
```

## Examples
```
cd examples/achievements && yarn install && yarn start
cd examples/notifications && yarn install && yarn start
cd examples/comments && yarn install && yarn start
```

## Setup
```
# For develop on macOS
brew install zeromq
```

## TODO
- [x] it should separated by services 
- [x] it should separated by environments
- [ ] it should have `client_id`
- [ ] it should generate `client_secret`
- [ ] it should generate `access_token` that contain `exp`, `client_id`
- [ ] Use MongoDB
- [ ] Use Mosca with MongoDB
- [ ] Apply scope to Mosca user
- [ ] Add Mosca user by service

## orz-provider
- [ ] it can verify `access_token` by `client_secret`
- [ ] it should provide `getUserNames` if `access_token` is provide.
- [ ] it should back off wrong request.

## TOHAVE
- [ ] it should have `scope`
- [ ] it should read only in `scope`
- [ ] it should generate `refresh_token` that contain `exp`, `client_id`
- [ ] it can regenerate `access_token` if `refresh_token` not expire.
