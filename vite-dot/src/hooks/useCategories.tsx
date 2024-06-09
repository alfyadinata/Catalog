/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

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
}

const useCategories = (initialData: Category[]) : CategoriesHook => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialData);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreate = () => {
    setFormData(null);
    openModal();
  };

  const handleEdit = (row: Category) => {
    setFormData(row);
    openModal();
  };

  const handleDelete = (row: Category) => {
    setCategories(prevCategories => prevCategories.filter(category => category.id !== row.id));
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search', query);
  };

  const handleChange = <K extends keyof Category>(key: K, value: Category[K]) => {
    setFormData((prevFormData:any) => ({
      ...(prevFormData || {}),
      [key]: value,
    }));
  };

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
  };
};

export default useCategories;
