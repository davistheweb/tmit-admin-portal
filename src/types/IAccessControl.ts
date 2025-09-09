export interface IRoutes {
  uri: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  name: string;
}

export interface IProtectedRoutes {
  route_name: string;
  permission: string;
}
