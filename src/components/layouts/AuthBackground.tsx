import React from "react";
import { authBackground } from "@/assets";

export const AuthBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-green-500 relative flex items-center justify-center md:justify-start w-full h-screen overflow-y-hidden overflow-x-hidden">
      <div
        className="absolute md:hidden w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBackground})` }}
      />
      <div className="absolute right-0 top-0 hidden md:flex">
        <div>
          <img
            className="select-none text-xs text-white"
            draggable={false}
            src={authBackground}
            alt="auth background"
            loading="lazy"
          />
        </div>
      </div>
      {/* The form will be placed here */}
      <div className="md:ml-15 z-10">{children}</div>
    </div>
  );
};
