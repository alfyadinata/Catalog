import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, onClick,type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-red-500 text-white py-2 px-4 flex items-center rounded hover:bg-red-600 transition-colors duration-200"
    >
      {children}
    </button>
  );
};

export default Button;
