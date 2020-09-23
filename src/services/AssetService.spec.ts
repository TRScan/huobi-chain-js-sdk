import { Account } from '@mutadev/account';
import { BigNumber } from '@mutadev/shared';
import { randomAddress } from '@mutadev/utils';
import { AssetService } from './AssetService';

const account = new Account();

function createRandomAsset(
  service: InstanceType<typeof AssetService>,
  options: { supply: number } = { supply: 10000 },
) {
  const supply = options.supply;
  const precision = 18;
  return service.write.create_asset({
    name: 'M' + (Math.random() * 10000).toFixed(0),
    supply,
    precision,
    symbol: 'M' + (Math.random() * 10000).toFixed(0),
    relayable: false,
    admin: account.address,
    init_mints: [{ addr: account.address, balance: supply }],
  });
}

test('test AssetService', async () => {
  const service = new AssetService();
  const supply = 10000;
  const res = await createRandomAsset(service, { supply });

  const asset = res.response.response.succeedData;

  expect(Number(res.response.response.code)).toBe(0);
  expect(new BigNumber(asset.supply).eq(new BigNumber(supply))).toBe(true);

  await service.write.transfer({
    asset_id: asset.id,
    to: randomAddress(),
    value: 123,
    memo: '',
  });

  const balanceRes = await service.read.get_balance({
    asset_id: asset.id,
    user: account.address,
  });

  expect(balanceRes.succeedData.balance).toBe(supply - 123);
});

test('mint and burn asset', async () => {
  const service = new AssetService();
  const res = await createRandomAsset(service);

  const asset = res.response.response.succeedData;
  const mintReceipt = await service.write.mint({
    asset_id: asset.id,
    amount: 10000,
    memo: 'mint',
    proof: '0x0000',
    to: account.address,
  });

  expect(Number(mintReceipt.response.response.code)).toBe(0);

  const balance1 = await service.read.get_balance({
    asset_id: asset.id,
    user: account.address,
  });

  expect(Number(balance1.succeedData.balance)).toBe(20000);

  const burnReceipt = await service.write.burn({
    asset_id: asset.id,
    amount: 10000,
    memo: 'burn',
    proof: '0x0000',
  });

  expect(Number(burnReceipt.response.response.code)).toBe(0);

  const balance2 = await service.read.get_balance({
    asset_id: asset.id,
    user: account.address,
  });

  expect(Number(balance2.succeedData.balance)).toBe(10000);
});
