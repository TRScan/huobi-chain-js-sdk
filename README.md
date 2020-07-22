# huobi-chain-sdk

Huobi Chain JavaScript SDK. The SDK is a binding for [Huobi Chain Services](https://github.com/HuobiGroup/huobi-chain/tree/master/services)  
base on [muta-sdk](https://github.com/nervosnetwork/muta-sdk-js). It is recommended to code with an IDE that supports TypeScript such as VSCode or WebStorm,
there will be corresponding code completion.

## Install

```
npm install @mutadev/muta-sdk@dev @mutadev/service@dev graphql@14.6 huobi-chain-sdk
```

## Example

```js
const { AssetService } = require("huobi-chain-sdk");

async function main() {
  const service = new AssetService();
  const receipt = await service.write.create_asset({
      name: 'MyToken',
      supply,
      precision,
      symbol: 'MT',
      relayable: false,
    });

  console.log(receipt.response);
}

main();
```
