import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { KycService } from './KycService';

const account = Account.fromPrivateKey(
  '0X0000000000000000000000000000000000000000000000000000000000000001',
);

const client = new Client({ defaultCyclesLimit: '0xffffff' });

test('test KycService', async () => {
  const service = new KycService(client, account);
  const res1 = await service.read.get_orgs();
  expect(Number(res1.code)).toBe(0);

  const res2 = await service.read.get_org_info('huobi');
  expect(Number(res2.code)).toBe(0);

  const res3 = await service.read.get_org_supported_tags('huobi');
  expect(Number(res3.code)).toBe(0);

  const res4 = await service.write.update_user_tags({
    org_name: 'huobi',
    user: 'muta1elcsqgg8zp2xp9ql09uz3argvea2rgkmglwr47',
    tags: {
      name: ['Alice'],
      age: ['10'],
    },
  });
  expect(Number(res4.response.response.code)).toBe(0);

  const res5 = await service.read.get_user_tags({
    org_name: 'huobi',
    user: 'muta1elcsqgg8zp2xp9ql09uz3argvea2rgkmglwr47',
  });
  expect(Number(res5.code)).toBe(0);

  const res6 = await service.read.get_org_info('muta');
  expect(Number(res6.code)).toBe(0x67);

  const res7 = await service.write.change_service_admin({
    new_admin: 'muta1elcsqgg8zp2xp9ql09uz3argvea2rgkmglwr47',
  });
  expect(Number(res7.response.response.code)).toBe(0);
});
