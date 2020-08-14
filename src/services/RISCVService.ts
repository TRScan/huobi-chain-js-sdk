import {
  Address,
  bool,
  createServiceClass,
  Hash,
  read,
  String,
  Vec,
  write,
} from '@mutadev/service';

export enum InterpreterType {
  Binary = 'Binary',
}

const DeployPayload = {
  code: String,
  /**
   * {@link InterpreterType}
   */
  intp_type: String,
  init_args: String,
};

const DeployResp = {
  address: Address,
  init_ret: String,
};

const ExecPayload = {
  address: Address,
  args: String,
};

const GetContractPayload = {
  address: Address,
  get_code: bool,
  storage_keys: Vec(String),
};

const AddressList = {
  addresses: Vec(Address),
};

const GetContractResp = {
  code_hash: Hash,
  intp_type: InterpreterType,
  code: String,
  storage_values: Vec(String),
  authorizer: Address,
};

/**
 * unusable, publish with next version
 */
export const RISCVService = createServiceClass('riscv', {
  call: read(ExecPayload, String),
  check_deploy_auth: read(AddressList, AddressList),
  get_contract: read(GetContractPayload, GetContractResp),
  exec: write(ExecPayload, String),

  grant_deploy_auth: write(AddressList, null),
  revoke_deploy_auth: write(AddressList, null),
  deploy: write(DeployPayload, DeployResp),
  approve_contracts: write(AddressList, null),
  revoke_contracts: write(AddressList, null),
});
