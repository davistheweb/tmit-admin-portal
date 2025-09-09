export type IRole = {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};

export type ICreateRoleResponse = {
  message: string;
  role: IRole;
};

export type IPermissions = {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};

export type ICreatePermissionsResponse = {
  message: string;
  role: IPermissions;
};
