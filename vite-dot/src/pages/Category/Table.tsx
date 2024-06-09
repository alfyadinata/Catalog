import React from "react";
import MyTable from "@/components/MyTable";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useCategories, { Category } from "@/hooks/useCategories"; // Assuming the hook exports Category type
import { TableColumn } from "react-data-table-component";

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
] as TableColumn<Category>[];

const CategoryList: React.FC = () => {
  const {
    isOpen,
    formData,
    categories,
    openModal,
    closeModal,
    handleDelete,
    handleSearch,
    handleChange,
    handleFillEdit,
    handleSubmit,
  } = useCategories();
  return (
    <div>
      <MyTable
        columns={columns}
        data={categories}
        onCreate={openModal}
        onEdit={handleFillEdit}
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
          <div className="flex justify-end">
            <Button type="submit">{formData?.id ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryList;
