import * as React from "react";
import { LoginBody } from "../_components/LoginForm";
import { AuthBackground } from "@/components/layouts";

export const Login: React.FC = () => (
  <div>
    <AuthBackground>
      <LoginBody />
    </AuthBackground>
  </div>
);
