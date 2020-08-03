import { Account, Client } from '@mutadev/muta-sdk';
import { AdmissionControlService } from './AdmissionControlService';

const account = Account.fromPrivateKey(
  '0X0000000000000000000000000000000000000000000000000000000000000001',
);

const client = new Client();

test('test AdmissionControlService', async () => {
  const service = new AdmissionControlService(client, account);
  const res = await service.write.permit({
    addrs: ['muta1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqggfy0d'],
  });

  expect(Number(res.response.response.code)).toBe(0);
});
