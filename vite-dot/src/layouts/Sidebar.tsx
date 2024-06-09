import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaCarAlt, FaOptinMonster } from "react-icons/fa";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { path: "/", label: "Dashboard", icon: <FaTachometerAlt className="mr-3" /> },
  { path: "/products", label: "Products", icon: <FaCarAlt className="mr-3" /> },
  {
    path: "/categories",
    label: "Categories",
    icon: <FaOptinMonster className="mr-3" />,
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-red-700" : "";
  };

  return (
    <div className="w-64 h-full bg-red-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold flex items-center">
        <span className="ml-3">Admin Panel</span>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center py-3 px-6 text-white hover:bg-red-700 transition-colors duration-200 ${isActive(
              item.path
            )}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
