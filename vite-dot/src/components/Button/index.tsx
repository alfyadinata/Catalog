import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-red-500 text-white py-2 px-4 flex items-center rounded hover:bg-red-600 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
