import { AdmissionControlService } from './AdmissionControlService';

test('test AdmissionControlService', async () => {
  const service = new AdmissionControlService();
  const res = await service.write.permit({
    addrs: ['muta1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqggfy0d'],
  });

  expect(Number(res.response.response.code)).toBe(0);
});
