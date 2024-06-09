import React from "react";
import MyTable from "@/components/MyTable";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useCategories, { Category } from "@/hooks/useCategories"; // Assuming the hook exports Category type
import { TableColumn } from "react-data-table-component";

const initialData: Category[] = [
  { id: 1, name: "Category 1", description: "Description 1" },
  { id: 2, name: "Category 2", description: "Description 2" },
];

const columns = [
  {
    name: "ID",
    selector: (row: Category) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: Category) => row.name || "",
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: Category) => row.description || "",
    sortable: true,
  },
] as TableColumn<Category>[];

const CategoryList: React.FC = () => {
  const {
    isOpen,
    formData,
    categories,
    openModal,
    closeModal,
    handleEdit,
    handleDelete,
    handleSearch,
    handleChange,
  } = useCategories(initialData);

  return (
    <div>
      <MyTable
        columns={columns}
        data={categories}
        onCreate={openModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            closeModal();
          }}
          className="p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-4">
            {formData?.id ? "Edit Category" : "Create Category"}
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
            type="text"
            placeholder="Description"
            value={formData ? formData.description : ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button type="submit">{formData?.id ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryList;
