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
  status: string;
  description: string;
  image: string;
}

const categories = [
  { id: 1, name: 'Pizzas' },
  { id: 2, name: 'Bebidas' },
  { id: 3, name: 'Sobremesas' },
  { id: 4, name: 'Promoções' },
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Pizza Margherita',
    category: 'Pizzas',
    price: 45.90,
    status: 'ativo',
    description: 'Molho de tomate, mussarela, tomate e manjericão',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Pizza Pepperoni',
    category: 'Pizzas',
    price: 49.90,
    status: 'ativo',
    description: 'Molho de tomate, mussarela e pepperoni',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Coca-Cola 2L',
    category: 'Bebidas',
    price: 12.90,
    status: 'ativo',
    description: 'Refrigerante Coca-Cola 2 litros',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Pudim',
    category: 'Sobremesas',
    price: 15.90,
    status: 'ativo',
    description: 'Pudim de leite condensado com calda de caramelo',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

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
    image: '',
    status: 'ativo'
  });

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      status: product.status
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Aqui você implementaria a lógica de exclusão
    console.log('Deletar produto:', selectedProduct?.id);
    handleCloseModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de salvamento
    console.log('Salvar alterações:', newProduct);
    setIsEditing(false);
    handleCloseModal();
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
      image: '',
      status: 'ativo'
    });
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Cardápio</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie os produtos do seu cardápio
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setSelectedProduct(null);
              setNewProduct({
                name: '',
                category: '',
                price: 0,
                description: '',
                image: '',
                status: 'ativo'
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <FaPlus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Lista de Produtos - Mobile */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleOpenModal(product)}
            className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  R$ {product.price.toFixed(2)}
                </p>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela de Produtos - Desktop */}
      <div className="hidden lg:block">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Nome
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Categoria
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Preço
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        R$ {product.price.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {product.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete()}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes/Edição */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setSelectedProduct(null);
        }}
        title={isEditing ? 'Editar Item' : 'Novo Item'}
      >
        {selectedProduct && (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Coluna 1 */}
              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 disabled:bg-gray-100 disabled:text-gray-900 disabled:opacity-60"
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
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 disabled:bg-gray-100 disabled:text-gray-900 disabled:opacity-60"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Preço
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      id="price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                      disabled={!isEditing}
                      className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 disabled:bg-gray-100 disabled:text-gray-900 disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              {/* Coluna 2 */}
              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 disabled:bg-gray-100 disabled:text-gray-900 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    URL da Imagem
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      disabled={!isEditing}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Aqui você pode implementar a lógica para selecionar uma imagem
                        alert('Funcionalidade de upload de imagem será implementada em breve');
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <FaImage />
                    </button>
                  </div>
                </div>

                {newProduct.image && (
                  <div className="mt-2">
                    <img
                      src={newProduct.image}
                      alt={newProduct.name}
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <FaEdit className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <FaTrash className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Excluir
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Salvar
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
} 