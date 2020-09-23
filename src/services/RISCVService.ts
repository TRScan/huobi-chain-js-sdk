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

export const DeployPayload = {
  code: String,
  /**
   * {@link InterpreterType}
   */
  intp_type: String,
  init_args: String,
};

export const DeployResp = {
  address: Address,
  init_ret: String,
};

export const ExecPayload = {
  address: Address,
  args: String,
};

export const GetContractPayload = {
  address: Address,
  get_code: bool,
  storage_keys: Vec(String),
};

export const AddressList = {
  addresses: Vec(Address),
};

export const GetContractResp = {
  code_hash: Hash,
  intp_type: InterpreterType,
  code: String,
  storage_values: Vec(String),
  authorizer: Address,
};

export const SetAdminPayload = {
  admin: Address,
};

/**
 * unusable, publish with next version
 */
export const RISCVService = createServiceClass('riscv', {
  call: read(ExecPayload, String),
  check_deploy_auth: read(AddressList, AddressList),
  get_contract: read(GetContractPayload, GetContractResp),
  get_admin: read(null, Address),

  set_admin: write(SetAdminPayload, null),
  exec: write(ExecPayload, String),
  grant_deploy_auth: write(AddressList, null),
  revoke_deploy_auth: write(AddressList, null),
  deploy: write(DeployPayload, DeployResp),
  approve_contracts: write(AddressList, null),
  revoke_contracts: write(AddressList, null),
});
