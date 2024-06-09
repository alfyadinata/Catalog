/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

interface ProductsHook {
  isOpen: boolean;
  formData: Product | null;
  products: Product[];
  openModal: () => void;
  closeModal: () => void;
  handleCreate: () => void;
  handleEdit: (row: Product) => void;
  handleDelete: (row: Product) => void;
  handleSearch: (query: string) => void;
  handleChange: <K extends keyof Product>(key: K, value: Product[K]) => void;
}

const useProducts = (initialData: Product[]) : ProductsHook => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(initialData);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreate = () => {
    setFormData(null);
    openModal();
  };

  const handleEdit = (row: Product) => {
    setFormData(row);
    openModal();
  };

  const handleDelete = (row: Product) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== row.id));
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search', query);
  };

  const handleChange = <K extends keyof Product>(key: K, value: Product[K]) => {
    setFormData((prevFormData:any) => ({
      ...(prevFormData || {}),
      [key]: value,
    }));
  };

  return {
    isOpen,
    formData,
    products,
    openModal,
    closeModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSearch,
    handleChange,
  };
};

export default useProducts;
