import React, { useRef, useEffect } from "react";
import { Link } from "react-router";

interface ProfileDropdownProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ open, setOpen }) => {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={profileRef}
      className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-md z-30"
    >
      <div className="px-4 py-2 text-sm font-bold text-gray-700 border-b">
        JOSIAH DAVIS CHIMZURUOKE
      </div>
      <Link
        to="profile"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <Link
        to="change-password"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Change Password
      </Link>
      <Link
        to="/logout"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t"
      >
        Logout
      </Link>
    </div>
  );
};

export default ProfileDropdown;
