import {
  Address,
  Bytes,
  createServiceClass,
  Hash,
  read,
  u32,
  u64,
  Vec,
  write,
} from '@mutadev/service';

export const ValidatorExtend = {
  bls_pub_key: Bytes,
  pub_key: Bytes,
  address: Address,
  propose_weight: u32,
  vote_weight: u32,
};

export const Metadata = {
  chain_id: Hash,
  bech32_address_hrp: String,
  common_ref: Bytes,
  timeout_gap: u64,
  cycles_limit: u64,
  cycles_price: u64,
  interval: u64,
  verifier_list: Vec(ValidatorExtend),
  propose_ratio: u64,
  prevote_ratio: u64,
  precommit_ratio: u64,
  brake_ratio: u64,
  tx_num_limit: u64,
  max_tx_size: u64,
};

export const UpdateMetadataPayload = {
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

export const MetadataService = createServiceClass('metadata', {
  get_metadata: read(null, Metadata),

  update_metadata: write(UpdateMetadataPayload, null),
});
