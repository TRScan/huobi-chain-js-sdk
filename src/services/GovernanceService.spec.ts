import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { GovernanceService } from './GovernanceService';

const account = Account.fromPrivateKey(
  '0X0000000000000000000000000000000000000000000000000000000000000001',
);

const client = new Client();

test('test GovernanceService', async () => {
  const service = new GovernanceService(client, account);
  const res = await service.read.get_admin();

  expect(Number(res.code)).toBe(0);
});
