import React from "react";
import Card from "@/components/Card";
import CategoryList from "./Table";

const Product: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category</h2>
      <Card>
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        <CategoryList />
      </Card>
    </div>
  );
};

export default Product;
