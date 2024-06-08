import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="p-6 bg-white rounded-lg shadow-md">{children}</div>;
};

export default Card;
