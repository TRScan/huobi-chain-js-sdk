import { MetadataService } from './MetadataService';



test('test MetadataService', async () => {
  const service = new MetadataService();
  const res = await service.read.get_metadata();
  expect(Number(res.code)).toBe(0);
});
