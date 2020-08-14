import {
  Address,
  bool,
  createServiceClass,
  read,
  Vec,
  write,
  HashMap,
  String,
} from '@mutadev/service';

const KycOrgInfo = {
  name: String,
  description: String,
  admin: Address,
  supported_tags: Vec(String),
  approved: bool,
};

const EvalUserTagExpression = {
  user: Address,
  expression: String,
};

const ChangeOrgAdmin = {
  name: String,
  new_admin: Address,
};

const ChangeServiceAdmin = {
  new_admin: Address,
};

const RegisterNewOrg = {
  name: String,
  description: String,
  admin: Address,
  supported_tags: Vec(String),
};

const ChangeOrgApproved = {
  org_name: String,
  approved: bool,
};

const UpdateOrgSupportTags = {
  org_name: String,
  supported_tags: Vec(String),
};

const GetUserTags = {
  org_name: String,
  user: Address,
};

const UpdateUserTags = {
  org_name: String,
  user: Address,
  tags: HashMap(Vec(String)),
};

export const KycService = createServiceClass('kyc', {
  get_orgs: read(null, Vec(String)),
  get_admin: read(null, Address),
  get_org_info: read(String, KycOrgInfo),
  get_org_supported_tags: read(String, Vec(String)),
  get_user_tags: read(GetUserTags, HashMap(Vec(String))),
  eval_user_tag_expression: read(EvalUserTagExpression, bool),

  change_org_approved: write(ChangeOrgApproved, null),
  change_service_admin: write(ChangeServiceAdmin, null),
  change_org_admin: write(ChangeOrgAdmin, null),
  register_org: write(RegisterNewOrg, null),
  update_supported_tags: write(UpdateOrgSupportTags, null),
  update_user_tags: write(UpdateUserTags, null),
});
