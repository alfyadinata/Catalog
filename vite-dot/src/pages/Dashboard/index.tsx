import React from "react";
import Card from "@/components/Card";

const Dashboard: React.FC = () => {
  const productCount = 100;
  const categoryCount = 20;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <p className="text-4xl font-bold">{productCount}</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Categories</h3>
          <p className="text-4xl font-bold">{categoryCount}</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
