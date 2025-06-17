"use client";

import { useState } from 'react';
import Modal from '@/components/Modal';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'X-Burger',
    category: 'Lanches',
    price: 25.90,
    description: 'Hambúrguer artesanal, queijo, alface, tomate e molho especial',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww'
  },
  {
    id: 2,
    name: 'Batata Frita',
    category: 'Acompanhamentos',
    price: 15.90,
    description: 'Porção de batata frita crocante com sal e orégano',
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 3,
    name: 'Coca-Cola',
    category: 'Bebidas',
    price: 8.90,
    description: 'Refrigerante Coca-Cola 350ml',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D'
  }
];

const categories = ['Lanches', 'Acompanhamentos', 'Bebidas', 'Sobremesas'];

export default function CardapioPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: ''
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleSave = () => {
    if (newProduct.id === 0) {
      // Novo produto
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
        description: newProduct.description,
        imageUrl: newProduct.imageUrl
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
      category: '',
      price: 0,
      description: '',
      imageUrl: ''
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cardápio</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setSelectedProduct(null);
            setNewProduct({
              id: 0,
              name: '',
              category: '',
              price: 0,
              description: '',
              imageUrl: ''
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <FaPlus /> Novo Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setNewProduct(product);
              setIsModalOpen(true);
            }}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-lg font-bold text-primary-600">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewProduct({
            id: 0,
            name: '',
            category: '',
            price: 0,
            description: '',
            imageUrl: ''
          });
        }}
        title={newProduct.id === 0 ? 'Novo Item' : 'Editar Item'}
      >
        <div className="space-y-4">
          {newProduct.imageUrl && (
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={newProduct.imageUrl}
                alt={newProduct.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                disabled={newProduct.id !== 0}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                id="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                disabled={newProduct.id !== 0}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Lanches">Lanches</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Sobremesas">Sobremesas</option>
              </select>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                disabled={newProduct.id !== 0}
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
                  className="block w-full rounded-l-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  disabled={newProduct.id !== 0}
                />
                {newProduct.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, imageUrl: '' })}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    disabled={newProduct.id !== 0}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              disabled={newProduct.id !== 0}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {newProduct.id !== 0 && (
            <>
              <button
                type="button"
                onClick={() => {
                  handleDelete(newProduct.id);
                  setIsModalOpen(false);
                }}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Excluir
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewProduct({
                    id: 0,
                    name: '',
                    category: '',
                    price: 0,
                    description: '',
                    imageUrl: ''
                  });
                }}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Editar
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
} 