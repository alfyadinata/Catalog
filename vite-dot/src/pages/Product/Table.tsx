

import React from 'react';
import MyTable from '@/components/MyTable';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useProducts from '@/hooks/useProducts';
import Select from 'react-select'


export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

const initialData: Product[] = [
  { id: 1, name: 'Product 1', price: 29, category: 'Category 1', description: 'Description 1' },
  { id: 2, name: 'Product 2', price: 49, category: 'Category 2', description: 'Description 2' },
];

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const columns = [
  {
    name: 'ID',
    selector: (row: Product) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row: Product) => row.name,
    sortable: true,
  },
  {
    name: 'Price',
    selector: (row: Product) => row.price,
    sortable: true,
  },
  {
    name: 'Category',
    selector: (row: Product) => row.category,
    sortable: true,
  },
];

const ProductList: React.FC = () => {
  const { isOpen, formData, products, openModal, closeModal, handleEdit, handleDelete, handleSearch, handleChange } = useProducts(initialData);

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
          onSubmit={e => {
            e.preventDefault();
            closeModal();
          }}
          className="p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-4">{formData ? 'Edit Product' : 'Create Product'}</h2>
          <Input
            type="text"
            placeholder="Name"
            value={formData ? formData.name : ''}
            onChange={e => handleChange('name', e.target.value)}
            required
            className="mb-4"
          />
          <Input
            type="number"
            placeholder="Price"
            value={formData ? formData.price : ''}
            onChange={e => handleChange('price', parseFloat(e.target.value))}
            required
            className="mb-4"
          />
          <Select options={options} className='mb-4 border rounded focus:outline-none focus:ring-1 focus:ring-red-500' placeholder="Category" />
          <Input
            type="text"
            placeholder="Description"
            value={formData ? formData.description : ''}
            onChange={e => handleChange('description', e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button type="submit">{formData?.id ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;
