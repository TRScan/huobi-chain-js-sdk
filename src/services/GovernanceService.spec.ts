import { GovernanceService } from './GovernanceService';

test('test GovernanceService', async () => {
  const service = new GovernanceService();
  const res = await service.read.get_admin();

  expect(Number(res.code)).toBe(0);
});
