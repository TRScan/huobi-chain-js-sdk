import {
  Address,
  bool,
  createServiceClass,
  Hash,
  read,
  u64,
  Vec,
  write,
} from '@mutadev/service';

const Record = {
  last_op_time: u64,
  daily_used_amount: u64,
  monthly_used_amount: u64,
  yearly_used_amount: u64,
};

const Rule = {
  kyc_expr: String,
  // quota while kyc_expr returns true
  quota: u64,
};

const AssetConfig = {
  admin: Address,
  activated: bool,
  single_bill_quota: Vec(Rule),
  daily_quota_rule: Vec(Rule),
  monthly_quota_rule: Vec(Rule),
  yearly_quota_rule: Vec(Rule),
};

const QuotaTransferPayload = {
  asset_id: Hash,
  address: Address,
  amount: u64,
};

const ChangeAssetConfigPayload = {
  asset_id: Hash,
  asset_config: AssetConfig,
};

const GetAssetConfigPayload = {
  asset_id: Hash,
};

const ChangeRecordPayload = {
  asset_id: Hash,
  address: Address,
  record: Record,
};

const GetRecordPayload = {
  asset_id: Hash,
  address: Address,
};

export const TransferQuotaService = createServiceClass('transfer_quota', {
  get_asset_config: read(GetAssetConfigPayload, AssetConfig),
  get_record: read(GetRecordPayload, Record),

  change_asset_config: write(ChangeAssetConfigPayload, null),
  change_record: write(ChangeRecordPayload, null),
  quota_transfer: write(QuotaTransferPayload, null),
});
