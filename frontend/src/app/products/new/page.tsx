// app/products/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductForm {
  name: string;
  description: string;
  price: number;
  sku: string;
  brand: string;
  manufacturer: string;
  category: string;
  subCategory: string;
  origin: string;
  tags: string;
  stockQuantity: number;
  reorderPoint: number;
  weightInKg: number;
  length: number;
  width: number;
  height: number;
  materials: string;
  technicalSpecs: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    sku: '',
    brand: '',
    manufacturer: '',
    category: 'Electronics',
    subCategory: '',
    origin: '',
    tags: '',
    stockQuantity: 0,
    reorderPoint: 10,
    weightInKg: 0,
    length: 0,
    width: 0,
    height: 0,
    materials: '',
    technicalSpecs: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generar SKU solo en el cliente
    if (isMounted && !formData.sku) {
      setFormData(prev => ({
        ...prev,
        sku: `SKU${Math.floor(1000 + Math.random() * 9000)}`
      }));
    }
  }, [isMounted]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5139/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error creating product');

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(t => t.trim()).join(',') : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">New Product</h1>
        <button
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name *
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Description *
                <textarea
                  name="description"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price (USD) *
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Brand *
                <input
                  type="text"
                  name="brand"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer *
                <input
                  type="text"
                  name="manufacturer"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category *
                <select
                  name="category"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Sub-Category
                <input
                  type="text"
                  name="subCategory"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.subCategory}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Inventory Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Inventory Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity *
                <input
                  type="number"
                  name="stockQuantity"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Reorder Point
                <input
                  type="number"
                  name="reorderPoint"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.reorderPoint}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
                <input
                  type="number"
                  name="weightInKg"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.weightInKg}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Dimensions (cm)
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Length"
                    name="length"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.length}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Width"
                    name="width"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.width}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Height"
                    name="height"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Materials
                <input
                  type="text"
                  name="materials"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.materials}
                  onChange={handleChange}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Technical Specifications
                <textarea
                  name="technicalSpecs"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.technicalSpecs}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter one specification per line"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}