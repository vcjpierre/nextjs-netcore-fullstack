// app/products/[id]/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {  
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  stockQuantity: number;
  reorderPoint: number;
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

export default function ProductDetail({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5139/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeleteConfirm(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete product');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5139/api/products/${params.id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-center text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.push('')}
            className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header con botones */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>←</span>
          <span>Back to Products</span>
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/products/edit/${params.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Product
          </Link>
          <button
            onClick={() => setDeleteConfirm(params.id.toString())}
            className="text-red-600 hover:text-red-800 px-4 py-2 rounded-md border border-red-100 bg-red-50"
          >
            Delete Product
          </button>
        </div>

        {deleteConfirm === params.id.toString() && (
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
                      onClick={() => handleDelete(params.id)}
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

      {/* Basic Information Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Price" value={`${product.price.toFixed(2)} USD`} />
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Stock Status:</span>
              <span className={`px-2 py-1 text-sm rounded-full ${product.stockQuantity > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}>
                {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <DetailItem label="Brand" value={product.brand} />
            <DetailItem label="Manufacturer" value={product.manufacturer} />
            <DetailItem label="Category" value={product.category} />
          </div>
          <div className="space-y-3">
            <DetailItem label="Origin" value={product.origin} />
            <DetailItem label="Sub-Category" value={product.subCategory} />
            <DetailItem label="Tags" value={product.tags} />
          </div>
        </div>
      </div>

      {/* Inventory Information Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Inventory Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="SKU" value={product.sku} />
          <DetailItem label="Stock Quantity" value={product.stockQuantity.toString()} />
          <DetailItem label="Reorder Point" value={product.reorderPoint.toString()} />
          <DetailItem label="Reorder Status" value={product.reorderStatus} />
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Specifications</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="pb-2 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Physical Specifications</h3>
              <DetailItem
                label="Weight"
                value={`${product.weightInKg} kg`}
              />
              <DetailItem
                label="Dimensions (L × W × H)"
                value={`${product.length}cm × ${product.width}cm × ${product.height}cm`}
              />
              <DetailItem
                label="Materials"
                value={product.materials}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Technical Specifications</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {product.technicalSpecs.split('\n').map((spec, index) => (
                    <li key={index} className="text-gray-700">
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente DetailItem mejorado
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-800 text-sm">{value}</span>
    </div>
  );
}