import {
  Address,
  bool,
  Bytes,
  createServiceClass,
  Hash,
  read,
  String,
  u64,
  Vec,
  write,
} from '@mutadev/service';

const NewAdmin = {
  new_admin: Address,
};

const AddressList = {
  addrs: Vec(Address),
};

const StatusList = {
  status: Vec(bool),
};

const TransactionRequest = {
  method: String,
  service_name: String,
  payload: String,
};

const RawTransaction = {
  chain_id: Hash,
  cycles_price: u64,
  cycles_limit: u64,
  nonce: Hash,
  request: TransactionRequest,
  timeout: u64,
  sender: Address,
};

const SignedTransaction = {
  raw: RawTransaction,
  tx_hash: Hash,
  pubkey: Bytes,
  signature: Bytes,
};

export const AdmissionControlService = createServiceClass('admission_control', {
  get_admin: read(null, Address),
  is_permitted: read(SignedTransaction, null),
  is_valid: read(SignedTransaction, null),
  status: read(AddressList, StatusList),

  change_admin: write(NewAdmin, null),
  forbid: write(AddressList, null),
  permit: write(AddressList, null),
});
