import React from "react";
import { Link } from "react-router";
import { schoolLogo } from "@/assets";

export const PageUnderdevelopment: React.FC<{ pageName?: string }> = ({pageName}) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-1">
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <img
          className="w-60"
          src={schoolLogo}
          alt="tmit-logo"
          draggable={false}
        />
        <h1 className="text-center">
          Hello ADMIN!, Welcome to TMIT Admin Core portal!
        </h1>
        <h1 className="text-center text-red-400 font-semibold">
          Please note that this {pageName} page is still under development by
          the technical team.
        </h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <Link
            to="/dashboard"
            className="bg-green-500 p-3 rounded-sm text-white"
          >
            Continue to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
