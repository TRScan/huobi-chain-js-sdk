# huobi-chain-sdk

The SDK is a wrapper for Huobi Chain [services](https://github.com/HuobiGroup/huobi-chain/tree/master/services) base on [muta-sdk](https://github.com/nervosnetwork/muta-sdk-js). Check out [Muta service](https://github.com/nervosnetwork/muta-sdk-js/tree/master/packages/muta-service) to learn more about how to use the SDK.

## Install

```
npm install graphql@14.7.0 huobi-chain-sdk
```

## Example

```js
const { AssetService } = require('huobi-chain-sdk');

async function main() {
  const service = new AssetService();
  const receipt = await service.write.create_asset({
    name: 'MyToken',
    supply: 10000000,
    precision: 0,
    symbol: 'MT',
    relayable: false,
    admin: '...',
    init_mints: [{ addr: '...', balance: 10000000 }],
  });

  console.log(receipt.response);
}

main();
```
