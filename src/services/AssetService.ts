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

export const GetBalancePayload = {
  asset_id: Hash,
  user: Address,
};

export const GetBalanceResponse = {
  asset_id: String,
  user: Address,
  balance: u64,
};

export const TransferPayload = {
  asset_id: Hash,
  to: Address,
  value: u64,
  memo: String,
};

export const IssuerWithBalance = {
  addr: Address,
  balance: u64,
};

export const CreateAssetPayload = {
  name: String,
  symbol: String,
  admin: Address,
  supply: u64,
  init_mints: Vec(IssuerWithBalance),
  precision: u64,
  relayable: bool,
};

export const Asset = {
  id: Hash,
  name: String,
  symbol: String,
  supply: u64,
  precision: u64,
  admin: Address,
  relayable: bool,
};

export const GetAssetPayload = {
  id: Hash,
};

export const ApprovePayload = TransferPayload;

export const TransferFromPayload = {
  asset_id: Hash,
  sender: Address,
  recipient: Address,
  value: u64,
  memo: String,
};

export const GetAllowancePayload = {
  asset_id: Hash,
  grantor: Address,
  grantee: Address,
};

export const GetAllowanceResponse = {
  asset_id: Hash,
  grantor: Address,
  grantee: Address,
  value: u64,
};

export const ChangeAdminPayload = {
  asset_id: Hash,
  new_admin: Address,
};

export const MintAssetPayload = {
  asset_id: Hash,
  to: Address,
  amount: u64,
  proof: Bytes,
  memo: String,
};

export const BurnAssetPayload = {
  asset_id: Hash,
  amount: u64,
  proof: Bytes,
  memo: String,
};

export const RelayAssetPayload = BurnAssetPayload;

export const AssetService = createServiceClass('asset', {
  get_asset: read(GetAssetPayload, Asset),
  get_native_asset: read(null, Asset),
  get_admin: read(Hash, Address),
  get_allowance: read(GetAllowancePayload, GetAllowanceResponse),
  get_balance: read(GetBalancePayload, GetBalanceResponse),

  create_asset: write(CreateAssetPayload, Asset),
  transfer: write(TransferPayload, null),
  approve: write(ApprovePayload, null),
  transfer_from: write(TransferFromPayload, null),
  change_admin: write(ChangeAdminPayload, null),
  mint: write(MintAssetPayload, null),
  burn: write(BurnAssetPayload, null),
  relay: write(RelayAssetPayload, null),
});
