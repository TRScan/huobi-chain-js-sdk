import { readFileSync } from 'fs';
import { Account } from '@mutadev/account';
import { Client } from '@mutadev/client';
import { InterpreterType, RISCVService } from './RISCVService';
import { join } from 'path';

const account = Account.fromPrivateKey(
  '0x2b672bb959fa7a852d7259b129b65aee9c83b39f427d6f7bded1f58c4c9310c2',
);

const client = new Client({
  defaultCyclesLimit: '0xffffffff',
});

const riscvService = new RISCVService(client, account);

async function deploy(code: string, initArgs: string) {
  return riscvService.write.deploy({
    code,
    intp_type: InterpreterType.Binary,
    init_args: initArgs,
  });
}

async function check_deploy_auth(address: string) {
  await riscvService.read.check_deploy_auth({
    addresses: [address],
  });
}

async function grant_deploy_auth(address: string) {
  await riscvService.write.grant_deploy_auth({
    addresses: [address],
  });
}

test('test RISCVService', async () => {
  await check_deploy_auth(account.address);
  await grant_deploy_auth(account.address);
  await check_deploy_auth(account.address);
  // const balance = await get_native_balance(account.address);
  const code = readFileSync(join(__dirname, 'resources/simple_storage'));
  const res = await deploy(code.toString('hex'), 'set k init');

  expect(Number(res.response.response.code)).toBe(0);
});
