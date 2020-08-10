import { createServiceBindingClass, read, write } from '@mutadev/service';
import { Address, Bytes, Hash, u64, Vec } from '@mutadev/types';

interface GetBalancePayload {
  asset_id: Hash;
  user: Address;
}

interface GetBalanceResponse {
  asset_id: string;
  user: Address;
  balance: u64;
}

interface TransferPayload {
  asset_id: Hash;
  to: Address;
  value: u64;
  memo: string;
}

interface IssuerWithBalance {
  addr: Address;
  balance: u64;
}

interface CreateAssetPayload {
  name: string;
  symbol: string;
  admin: Address;
  supply: u64;
  init_mints: Vec<IssuerWithBalance>;
  precision: u64;
  relayable: boolean;
}

interface Asset {
  id: Hash;
  name: string;
  symbol: string;
  supply: u64;
  precision: u64;
  issuer: Address;
  relayable: boolean;
}

interface GetAssetPayload {
  id: Hash;
}

type ApprovePayload = TransferPayload;

interface TransferFromPayload {
  asset_id: Hash;
  sender: Address;
  recipient: Address;
  value: u64;
  memo: string;
}

interface GetAllowancePayload {
  asset_id: Hash;
  grantor: Address;
  grantee: Address;
}

interface GetAllowanceResponse {
  asset_id: Hash;
  grantor: Address;
  grantee: Address;
  value: u64;
}

interface ChangeAdminPayload {
  asset_id: Hash;
  new_admin: Address;
}

interface MintAssetPayload {
  asset_id: Hash;
  to: Address;
  amount: u64;
  proof: Bytes;
  memo: string;
}

interface BurnAssetPayload {
  asset_id: Hash;
  amount: u64;
  proof: Bytes;
  memo: string;
}

type RelayAssetPayload = BurnAssetPayload;

export const AssetService = createServiceBindingClass({
  serviceName: 'asset',
  read: {
    get_asset: read<GetAssetPayload, Asset>(),
    get_native_asset: read<null, Asset>(),
    get_admin: read<Hash, Address>(),
    get_allowance: read<GetAllowancePayload, GetAllowanceResponse>(),
    get_balance: read<GetBalancePayload, GetBalanceResponse>(),
  },
  write: {
    create_asset: write<CreateAssetPayload, Asset>(),
    transfer: write<TransferPayload, null>(),
    approve: write<ApprovePayload, null>(),
    transfer_from: write<TransferFromPayload, null>(),
    change_admin: write<ChangeAdminPayload, null>(),
    mint: write<MintAssetPayload, null>(),
    burn: write<BurnAssetPayload, null>(),
    relay: write<RelayAssetPayload, null>(),
  },
});
