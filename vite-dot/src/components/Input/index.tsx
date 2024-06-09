import React from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  required,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`px-3 py-2 border  rounded focus:outline-none focus:ring-1 focus:ring-red-500 ${className}`}
    />
  );
};

export default Input;
