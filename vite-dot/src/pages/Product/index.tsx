import React from "react";
import Card from "@/components/Card";
import ProductList from "./Table";

const Product: React.FC = () => {

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product</h2>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <ProductList />
        </Card>
    </div>
  );
};

export default Product;
