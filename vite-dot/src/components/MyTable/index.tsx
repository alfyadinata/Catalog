import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onCreate: () => void;
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
  onSearch: (query: string) => void;
}

const MyTable = <T extends object>({
  columns,
  data,
  onCreate,
  onDelete,
  onEdit,
  onSearch,
}: TableProps<T>) => {
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  const customColumns = [
    ...columns,
    {
      name: 'Actions',
      cell: (row: T) => (
        <div className="flex space-x-2">
          <button onClick={() => onEdit(row)} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(row)} className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <Button onClick={onCreate}>
          <FaPlus className="mr-2" /> Add
        </Button>
      </div>
      <DataTable
        columns={customColumns}
        data={data}
        pagination
        highlightOnHover
        className="min-w-full divide-y divide-gray-200"
      />
    </div>
  );
};

export default MyTable;
