/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "@/helpers/api";

export interface CategorySelect {
  label: string;
  value: number;
}
interface Product {
  id: number;
  name: string;
  price: number;
  category: CategorySelect;
  description?: string;
}

interface ProductsHook {
  isOpen: boolean;
  formData: Product | null;
  products: Product[];
  openModal: () => void;
  closeModal: () => void;
  handleCreate: (data: Product) => Promise<void>;
  handleEdit: (data: Product) => Promise<void>;
  handleDelete: (data: Product) => Promise<void>;
  handleSearch: (query: string) => void;
  handleChange: (key: keyof Product, value: any) => void;
  handleSubmit: () => void;
}

const useProducts = (): ProductsHook => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const fetchProducts = async () => {
    try {
      setFormData(null);
      const response = await api.get<Product[]>("/products"); // Fetch products from API
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const data = { ...formData, category_id: formData?.category.value };
      delete data?.category;
      await api.post("/products", data);
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const data = { ...formData, category_id: formData?.category.value };
      delete data?.category;
      await api.put(`/products/${data?.id}`, data);
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (row: Product) => {
    try {
      await api.delete(`/products/${row?.id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log("Search", query);
  };

  const handleChange = (key: keyof Product, value: any) => {
    setFormData((prevFormData: any) => ({
      ...(prevFormData || {} || null),
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    formData?.id ? handleEdit() : handleCreate();
  };

  useEffect(() => {
    fetchProducts();
  }, []);
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
    handleSubmit,
  };
};

export default useProducts;
