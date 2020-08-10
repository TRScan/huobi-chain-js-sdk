import { createServiceBindingClass, read, write } from '@mutadev/service';
import { Address, Vec } from '@mutadev/types';
import { Bytes, Hash, u64 } from '@mutadev/service/lib/types';

interface NewAdmin {
  new_admin: Address;
}

interface AddressList {
  addrs: Vec<Address>;
}

interface StatusList {
  status: Vec<boolean>;
}

interface TransactionRequest {
  method: string;
  service_name: string;
  payload: string;
}

interface RawTransaction {
  chain_id: Hash;
  cycles_price: u64;
  cycles_limit: u64;
  nonce: Hash;
  request: TransactionRequest;
  timeout: u64;
  sender: Address;
}

interface SignedTransaction {
  raw: RawTransaction;
  tx_hash: Hash;
  pubkey: Bytes;
  signature: Bytes;
}

export const AdmissionControlService = createServiceBindingClass({
  serviceName: 'admission_control',
  read: {
    get_admin: read<null, Address>(),
    is_permitted: read<SignedTransaction, null>(),
    is_valid: read<SignedTransaction, null>(),
    status: read<AddressList, StatusList>(),
  },
  write: {
    change_admin: write<NewAdmin, null>(),
    forbid: write<AddressList, null>(),
    permit: write<AddressList, null>(),
  },
});
