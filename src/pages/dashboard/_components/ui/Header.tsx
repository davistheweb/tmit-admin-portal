import React from "react";
import { Menu, X, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { avatarImg, schoolLogo } from "@/assets";

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
  profileOpen,
  setProfileOpen,
}) => {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b bg-white shadow-sm relative">
      <div className="flex items-center gap-2 sm:gap-4">
     
        <button
          onClick={toggleSidebar}
          className="text-gray-700 cursor-pointer p-1 sm:p-2"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

      
        <div className="flex items-center gap-2 max-w-[150px] sm:max-w-none">
          <img
            src={schoolLogo}
            alt="Logo"
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
          />
          <span className="text-[10px] sm:text-xs font-semibold text-gray-800 hidden xs:block truncate">
            THOMAS MCGETTRICK INSTITUTE OF TECHNOLOGY
          </span>
        </div>

     
        <div className="hidden md:block h-6 w-px bg-gray-300" />

        <h1 className="text-sm sm:text-base font-semibold hidden md:block">
          Dashboard
        </h1>
      </div>


      <div className="flex items-center gap-3 sm:gap-4">

        <button className="relative text-gray-700 hover:text-gray-900 cursor-pointer p-1 sm:p-2">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500" />
        </button>


        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="rounded-full cursor-pointer overflow-hidden border-2 border-gray-300 focus:outline-none p-0"
          >
            <img
              src={avatarImg}
              alt="User Avatar"
              className="h-8 w-8 object-cover"
            />
          </button>

          <ProfileDropdown open={profileOpen} setOpen={setProfileOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
