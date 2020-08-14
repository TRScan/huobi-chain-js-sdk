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

const GetBalancePayload = {
  asset_id: Hash,
  user: Address,
};

const GetBalanceResponse = {
  asset_id: String,
  user: Address,
  balance: u64,
};

const TransferPayload = {
  asset_id: Hash,
  to: Address,
  value: u64,
  memo: String,
};

const IssuerWithBalance = {
  addr: Address,
  balance: u64,
};

const CreateAssetPayload = {
  name: String,
  symbol: String,
  admin: Address,
  supply: u64,
  init_mints: Vec(IssuerWithBalance),
  precision: u64,
  relayable: bool,
};

const Asset = {
  id: Hash,
  name: String,
  symbol: String,
  supply: u64,
  precision: u64,
  issuer: Address,
  relayable: bool,
};

const GetAssetPayload = {
  id: Hash,
};

const ApprovePayload = TransferPayload;

const TransferFromPayload = {
  asset_id: Hash,
  sender: Address,
  recipient: Address,
  value: u64,
  memo: String,
};

const GetAllowancePayload = {
  asset_id: Hash,
  grantor: Address,
  grantee: Address,
};

const GetAllowanceResponse = {
  asset_id: Hash,
  grantor: Address,
  grantee: Address,
  value: u64,
};

const ChangeAdminPayload = {
  asset_id: Hash,
  new_admin: Address,
};

const MintAssetPayload = {
  asset_id: Hash,
  to: Address,
  amount: u64,
  proof: Bytes,
  memo: String,
};

const BurnAssetPayload = {
  asset_id: Hash,
  amount: u64,
  proof: Bytes,
  memo: String,
};

const RelayAssetPayload = BurnAssetPayload;

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
