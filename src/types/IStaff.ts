// export interface IPermission {
//   id: string;
//   name: string;
//   description: string;
//   category: "read" | "write" | "delete" | "admin";
// }
export type IPermission = {
  id: number;
  name: string;
  description: string;
};

export interface IRole {
  id: string;
  name: string;
  description: string;
}

export interface IStaff {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  // roles: IRole[];
  // permissions: IPermission[];
}

export interface IStaffListResponse {
  data: IStaff[];

  // total: number;
  // page: number;
  // limit: number;
}

export interface IStaffDetailsResponse {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  // roles: IRole[];
  // permissions: IPermission[];
}

export interface IAssignRoleToStaff {
  staff_id: number;
  role_id: number;
}
