// routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};
