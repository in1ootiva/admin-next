"use client";

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from '@/components/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  imageUrl?: string;
  description?: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'X-Burger',
    price: 25.90,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    description: 'Hambúrguer artesanal com queijo, alface, tomate e molho especial'
  },
  {
    id: 2,
    name: 'Batata Frita',
    price: 15.90,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    description: 'Porção de batatas fritas crocantes com sal e orégano'
  },
  {
    id: 3,
    name: 'Coca-Cola',
    price: 8.90,
    isActive: false,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    description: 'Refrigerante Coca-Cola 350ml gelado'
  }
];

export default function CardapioPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    isActive: true,
    imageUrl: '',
    description: ''
  });

  const handleSave = () => {
    if (newProduct.id === 0) {
      // Novo produto
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        price: newProduct.price,
        isActive: newProduct.isActive,
        imageUrl: newProduct.imageUrl,
        description: newProduct.description
      };
      setProducts([...products, product]);
    } else {
      // Editar produto existente
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
    }
    setIsModalOpen(false);
    setNewProduct({
      id: 0,
      name: '',
      price: 0,
      isActive: true,
      imageUrl: '',
      description: ''
    });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Cardápio</h1>
        <button
          onClick={() => {
            setNewProduct({
              id: 0,
              name: '',
              price: 0,
              isActive: true,
              imageUrl: '',
              description: ''
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-200"
        >
          <FaPlus className="mr-2" />
          Novo Item
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Preço
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr 
                key={product.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  setNewProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">R$ {product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(product.id);
                    }}
                    className={`text-sm font-medium ${
                      product.isActive 
                        ? 'text-red-700 hover:text-red-900' 
                        : 'text-green-700 hover:text-green-900'
                    } transition-colors duration-200`}
                  >
                    {product.isActive ? 'Desativar' : 'Ativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewProduct({
            id: 0,
            name: '',
            price: 0,
            isActive: true,
            imageUrl: '',
            description: ''
          });
        }}
        title={newProduct.id === 0 ? 'Novo Item' : 'Editar Item'}
      >
        <div className="space-y-4">
          {newProduct.imageUrl && (
            <div className="w-full max-w-[300px] mx-auto aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
              <Image
                src={newProduct.imageUrl}
                alt={newProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 300px) 100vw, 300px"
              />
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm text-gray-900 p-2"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Preço
            </label>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm text-gray-900 p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              rows={3}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm text-gray-900 p-2"
              placeholder="Descreva o produto..."
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              URL da Imagem
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="imageUrl"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                className="block w-full rounded-l-md border-gray-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm text-gray-900 p-2"
                placeholder="https://..."
              />
              {newProduct.imageUrl && (
                <button
                  type="button"
                  onClick={() => setNewProduct({ ...newProduct, imageUrl: '' })}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newProduct.isActive}
                onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Item Ativo</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {newProduct.id !== 0 && (
            <button
              type="button"
              onClick={() => {
                handleDelete(newProduct.id);
                setIsModalOpen(false);
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 transition-colors duration-200"
            >
              Excluir
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors duration-200"
          >
            {newProduct.id === 0 ? 'Salvar' : 'Salvar Alterações'}
          </button>
        </div>
      </Modal>
    </div>
  );
} 