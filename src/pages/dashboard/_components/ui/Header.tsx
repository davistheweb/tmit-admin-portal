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
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm relative">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 cursor-pointer"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        {/* Logo + Text */}
        <div className="flex items-center gap-2">
          <img src={schoolLogo} alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-xs font-semibold text-gray-800 hidden sm:block">
            THOMAS MCGETTRICK INSTITUTE OF TECHNOLOGY
          </span>
        </div>

        {/* Separator */}
        <div className="hidden md:block h-6 w-px bg-gray-300" />

        {/* Page Title */}
        <h1 className="text-base font-semibold hidden md:block">Dashboard</h1>
      </div>

      {/* Right section: Notifications + Profile */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-700 hover:text-gray-900 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="relative cursor-pointer">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="block rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none cursor-pointer"
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
