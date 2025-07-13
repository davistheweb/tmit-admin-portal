import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutAdmin } from "@/api/services/LogoutAdmin";
import { useAuth } from "@/hooks/useAuth";

interface ProfileDropdownProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ open, setOpen }) => {
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const message = await logoutAdmin();
      toast.success(message || "Logged out");
      localStorage.clear();
      toast.success("Logout Successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unknown error during logout");
      }
    }
  };

  return (
    <div
      ref={profileRef}
      className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-md z-30"
    >
      <div className="px-4 py-2 text-sm font-bold text-gray-700 border-b">
        {user?.name}
      </div>
      {/* <Link
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
      </Link> */}
      <button
        className="w-full cursor-pointer block px-4 py-2 text-gray-700 hover:bg-red-400 border-t"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
