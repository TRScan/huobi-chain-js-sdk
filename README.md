# huobi-chain-sdk

The SDK is a wrapper for Huobi Chain [services](https://github.com/HuobiGroup/huobi-chain/tree/master/services) base on [muta-sdk](https://github.com/nervosnetwork/muta-sdk-js). Check out [Muta service](https://github.com/nervosnetwork/muta-sdk-js/tree/master/packages/muta-service) to learn more about how to use the SDK.

## Install

```
npm install @mutadev/muta-sdk@dev.2 \
  @mutadev/service@dev.2 \
  graphql@14.6 \
  huobi-chain-sdk
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
  });

  console.log(receipt.response);
}

main();
```
