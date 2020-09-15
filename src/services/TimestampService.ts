import {
  Address,
  bool,
  createServiceClass,
  read,
  u64,
  write,
} from '@mutadev/service';

const TimestampInfo = {
  admin: Address,
  oracle: bool,
};

const FeedTimePayload = {
  timestamp: u64,
};

const SetAdminPayload = {
  admin: Address,
};



const SetOraclePayload = {
  oracle: bool,
};

export const TimestampService = createServiceClass('timestamp', {
  now: read(null, u64),
  get_admin: read(null, Address),
  get_info: read(null, TimestampInfo),

  feed_time: write(FeedTimePayload, null),
  set_admin: write(SetAdminPayload, null),
  set_oracle: write(SetOraclePayload, null),
});
