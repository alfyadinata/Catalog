/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "@/helpers/api";
export interface Category {
  id: number;
  name: string;
  description?: string;
}

interface CategoriesHook {
  isOpen: boolean;
  formData: Category | null;
  categories: Category[];
  openModal: () => void;
  closeModal: () => void;
  handleCreate: () => void;
  handleEdit: (row: Category) => void;
  handleDelete: (row: Category) => void;
  handleSearch: (query: string) => void;
  handleChange: <K extends keyof Category>(key: K, value: Category[K]) => void;
  handleFillEdit: (row: Category) => void;
  handleSubmit: () => void;
}

const useCategories = (): CategoriesHook => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const openModal = () => {
    setFormData(null);
    setIsOpen(true);
  };
  const closeModal = () => {
    setFormData(null);
    setIsOpen(false);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log("Search", query);
  };

  const handleChange = <K extends keyof Category>(
    key: K,
    value: Category[K]
  ) => {
    setFormData((prevFormData: any) => ({
      ...(prevFormData || {}),
      [key]: value,
    }));
  };

  const fetchCategories = async () => {
    try {
      setFormData(null);
      const response = await api.get<Category[]>("/categories"); // Fetch categories from API
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await api.post<Category>("/categories", formData); // Create category
      setCategories([...categories, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const row = formData;
      await api.put<Category>(`/categories/${row?.id}`, formData);
      closeModal();
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (row: Category) => {
    try {
      await api.delete(`/categories/${row.id}`); // Delete category
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleFillEdit = (row: Category) => {
    setIsOpen(true);
    setFormData(row);
  };

  const handleSubmit = () => {
    formData?.id ? handleEdit() : handleCreate();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    isOpen,
    formData,
    categories,
    openModal,
    closeModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSearch,
    handleChange,
    handleFillEdit,
    handleSubmit,
  };
};

export default useCategories;
