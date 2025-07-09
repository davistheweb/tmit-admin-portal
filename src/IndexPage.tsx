import { Link } from "react-router";
import { schoolLogo } from "./assets";

export default function IndexPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-1">
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <img
          className="w-60"
          src={schoolLogo}
          alt="tmit-logo"
          draggable={false}
        />
        <h1>Hello Administrator, Welcome!</h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="bg-gray-500 h-1 w-15" />
          <Link className="text-bold text-xl" to="/login">
            Login to continue
          </Link>
        </div>
      </div>
    </div>
  );
}
