import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { MetadataService } from './MetadataService';

const account = Account.fromPrivateKey(
  '0X0000000000000000000000000000000000000000000000000000000000000001',
);

const client = new Client();

test('test MetadataService', async () => {
  const service = new MetadataService(client, account);
  const res = await service.read.get_metadata();
  expect(Number(res.code)).toBe(0);
});
