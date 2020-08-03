import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { BigNumber } from '@mutadev/shared';
import { AssetService } from './AssetService';

const account = Account.fromPrivateKey(
  '0X0000000000000000000000000000000000000000000000000000000000000001',
);

const client = new Client();

test('test AssetService', async () => {
  const service = new AssetService(client, account);

  const supply = 10000;
  const precision = 18;
  const res = await service.write.create_asset({
    name: 'M' + (Math.random() * 10000).toFixed(0),
    supply,
    precision,
    symbol: 'M' + (Math.random() * 10000).toFixed(0),
    relayable: false,
    admin: account.address,
    init_mints: [{ addr: account.address, balance: supply }],
  });

  const asset = res.response.response.succeedData;

  expect(Number(res.response.response.code)).toBe(0);
  expect(new BigNumber(asset.supply).eq(new BigNumber(supply))).toBe(true);

  await service.write.transfer({
    asset_id: asset.id,
    to: 'muta1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqggfy0d',
    value: 123,
    memo: '',
  });

  const balanceRes = await service.read.get_balance({
    asset_id: asset.id,
    user: account.address,
  });

  expect(balanceRes.succeedData.balance).toBe(supply - 123);
});
