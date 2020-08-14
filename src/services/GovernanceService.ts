import {
  Address,
  Bytes,
  createServiceClass,
  read,
  u32,
  u64,
  Vec,
  write,
} from '@mutadev/service';

const SetAdminPayload = {
  admin: Address,
};

const DiscountLevel = {
  threshold: u64,
  discount_percent: u64,
};

const GovernanceInfo = {
  admin: Address,
  tx_failure_fee: u64,
  tx_floor_fee: u64,
  profit_deduct_rate_per_million: u64,
  tx_fee_discount: Vec(DiscountLevel),
  miner_benefit: u64,
};

const SetGovernInfoPayload = {
  inner: GovernanceInfo,
};

const MinerChargeConfig = {
  address: Address,
  miner_charge_address: Address,
};

const ValidatorExtend = {
  bls_pub_key: Bytes,
  pub_key: Bytes,
  address: Address,
  propose_weight: u32,
  vote_weight: u32,
};

const UpdateMetadataPayload = {
  verifier_list: Vec(ValidatorExtend),
  interval: u64,
  propose_ratio: u64,
  prevote_ratio: u64,
  precommit_ratio: u64,
  brake_ratio: u64,
  timeout_gap: u64,
  cycles_limit: u64,
  cycles_price: u64,
  tx_num_limit: u64,
  max_tx_size: u64,
};

const UpdateValidatorsPayload = {
  verifier_list: Vec(ValidatorExtend),
};

const UpdateIntervalPayload = {
  interval: u64,
};

const UpdateRatioPayload = {
  propose_ratio: u64,
  prevote_ratio: u64,
  precommit_ratio: u64,
  brake_ratio: u64,
};

const AccumulateProfitPayload = {
  address: Address,
  accumulated_profit: u64,
};

export const GovernanceService = createServiceClass('governance', {
  get_admin: read(null, Address),
  get_govern_info: read(null, GovernanceInfo),
  get_tx_failure_fee: read(null, u64),
  get_tx_floor_fee: read(null, u64),

  set_admin: write(SetAdminPayload, null),
  set_govern_info: write(SetGovernInfoPayload, null),
  set_miner: write(MinerChargeConfig, null),
  update_metadata: write(UpdateMetadataPayload, null),
  update_validators: write(UpdateValidatorsPayload, null),
  update_interval: write(UpdateIntervalPayload, null),
  update_ratio: write(UpdateRatioPayload, null),
  accumulate_profit: write(AccumulateProfitPayload, null),
});
