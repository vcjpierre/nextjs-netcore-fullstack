// app/products/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stockQuantity: number;
  reorderStatus: string;
  brand: string;
  manufacturer: string;
  category: string;
  subCategory: string;
  origin: string;
  tags: string;
  weightInKg: number;
  length: number;
  width: number;
  height: number;
  materials: string;
  technicalSpecs: string;
}

interface ApiResponse {
  items: Product[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const pageSize = 10;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    try {
      const res = await fetch(
        `http://localhost:5139/api/products?page=${page}&pageSize=${pageSize}`
      );

      if (!res.ok) throw new Error('Error fetching products');

      const data: ApiResponse = await res.json();
      setProducts(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5139/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(prev => prev.filter(product => product.id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => router.push('/products/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/products/${product.id}`}
                  className="hover:text-blue-600"
                >
                  <h2 className="text-xl font-semibold hover:underline">
                    {product.name}
                  </h2>
                </Link>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-1">
                    <p><span className="font-medium">Price:</span> ${product.price.toFixed(2)}</p>
                    <p><span className="font-medium">SKU:</span> {product.sku}</p>
                    <p><span className="font-medium">Stock:</span>
                      <span className={`ml-2 ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="font-medium">Category:</span> {product.category}</p>
                    <p><span className="font-medium">Brand:</span> {product.brand}</p>
                    <p><span className="font-medium">Manufacturer:</span> {product.manufacturer}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDeleteConfirm(product.id)}
                className="text-red-600 hover:text-red-800 px-2 py-1"
              >
                Delete
              </button>
            </div>

            { deleteConfirm === product.id && (
              <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                {/* Fondo del modal */}
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/* Contenido del modal */}
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          {/* Icono de advertencia */}
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                              className="h-6 w-6 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                              />
                            </svg>
                          </div>

                          {/* Contenido del texto */}
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">
                              Delete Product
                            </h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this product? This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(null)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}