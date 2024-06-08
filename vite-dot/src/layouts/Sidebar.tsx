import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCogs } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-blue-700" : "";
  };

  return (
    <div className="w-64 h-full bg-blue-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold flex items-center">
        <span className="ml-3">Admin Panel</span>
      </div>
      <nav className="mt-6">
        <Link
          to="/"
          className={`flex items-center py-3 px-6 text-white hover:bg-blue-700 transition-colors duration-200 ${isActive(
            "/"
          )}`}
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>
        <Link
          to="/users"
          className={`flex items-center py-3 px-6 text-white hover:bg-blue-700 transition-colors duration-200 ${isActive(
            "/users"
          )}`}
        >
          <FaUsers className="mr-3" />
          Users
        </Link>
        <Link
          to="/settings"
          className={`flex items-center py-3 px-6 text-white hover:bg-blue-700 transition-colors duration-200 ${isActive(
            "/settings"
          )}`}
        >
          <FaCogs className="mr-3" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
