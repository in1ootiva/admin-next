"use client";

import { useState } from 'react';
import Modal from '@/components/Modal';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import Image from 'next/image';

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
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: ''
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
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
    if (isEditing && selectedProduct) {
      setProducts(products.map(product => 
        product.id === selectedProduct.id 
          ? { ...product, ...newProduct }
          : product
      ));
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedProduct(null);
    setNewProduct({
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-green-600 font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setSelectedProduct(null);
        }}
        title={isEditing ? 'Editar Item' : 'Novo Item'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço
            </label>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  // Aqui você pode implementar a lógica para selecionar uma imagem
                  alert('Funcionalidade de upload de imagem será implementada em breve');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <FaImage />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
                setSelectedProduct(null);
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 