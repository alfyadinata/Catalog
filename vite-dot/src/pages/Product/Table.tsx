/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MyTable from "@/components/MyTable";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useProducts, { CategorySelect } from "@/hooks/useProducts";
import Select from "react-select";
import useCategories from "@/hooks/useCategories";
import { TableColumn } from "react-data-table-component";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: CategorySelect;
  description?: string;
}

const columns = [
  {
    name: "ID",
    selector: (row: Product) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: Product) => row.name,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row: Product) => row.price,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row: Product) => row.category?.name,
    sortable: true,
  },
] as TableColumn<Product>[];

const ProductList: React.FC = () => {
  const {
    isOpen,
    formData,
    products,
    openModal,
    closeModal,
    handleEdit,
    handleDelete,
    handleSearch,
    handleChange,
    handleSubmit,
  } = useProducts();
  const { categories } = useCategories();
  const [option, setOption] = useState<any>([]);
  useEffect(() => {
    const filtered = categories.map((item) => {
      return { label: item.name, value: item.id };
    });
    setOption(filtered);
  }, [categories.length]);

  return (
    <div>
      <MyTable
        columns={columns}
        data={products}
        onCreate={openModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-4">
            {formData?.id ? "Edit Product" : "Create Product"}
          </h2>
          <Input
            type="text"
            placeholder="Name"
            value={formData ? formData.name : ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className="mb-4"
          />
          <Input
            type="number"
            placeholder="Price"
            value={formData ? formData.price : ""}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
            required
            className="mb-4"
          />
          <Select
            options={option}
            className="mb-4 border rounded focus:outline-none focus:ring-1 focus:ring-red-500"
            placeholder="Category"
            required
            onChange={(row) => {
              handleChange("category", row);
            }}
            value={formData?.category}
          />
          <div className="flex justify-end">
            <Button type="submit">{formData?.id ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;
