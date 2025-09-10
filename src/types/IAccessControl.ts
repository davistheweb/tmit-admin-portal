export interface IRoutes {
  uri: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  name: string;
}

export interface IProtectedRoutes {
  route_name: string;
  permission: string;
}

export interface IAddPermissionToRoute {
  route_name: string;
  permission_id: number;
}

export interface IAssignRolesToPermission {
  permission_id: number;
  role_id: number;
}
