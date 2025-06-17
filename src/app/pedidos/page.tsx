"use client";

import { useState } from 'react';
import Modal from '@/components/Modal';
import { FaWhatsapp, FaPrint } from 'react-icons/fa';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: number;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: string;
  time: string;
  address: string;
  paymentMethod: string;
  notes?: string;
  table: number;
}

const orders: Order[] = [
  {
    id: 1,
    customerName: 'João Silva',
    items: [
      { name: 'X-Burger', quantity: 2 },
      { name: 'Batata Frita', quantity: 1 },
      { name: 'Coca-Cola', quantity: 2 }
    ],
    total: 89.90,
    status: 'Pendente',
    time: '12:30',
    address: 'Rua das Flores, 123',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Sem cebola no X-Burger',
    table: 1
  },
  {
    id: 2,
    customerName: 'Maria Santos',
    items: [
      { name: 'X-Salada', quantity: 1 },
      { name: 'Milk Shake', quantity: 1 }
    ],
    total: 45.90,
    status: 'Em Preparo',
    time: '12:45',
    address: 'Av. Principal, 456',
    paymentMethod: 'Dinheiro',
    table: 2
  }
];

export default function PedidosPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    if (selectedOrder) {
      const message = `Olá! Aqui está o resumo do seu pedido #${selectedOrder.id}:\n\n` +
        `Itens:\n${selectedOrder.items.map(item => `- ${item.name} (${item.quantity}x)`).join('\n')}\n\n` +
        `Total: R$ ${selectedOrder.total.toFixed(2)}\n` +
        `Status: ${selectedOrder.status}\n` +
        `Endereço: ${selectedOrder.address}\n` +
        `Forma de Pagamento: ${selectedOrder.paymentMethod}`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Preparo':
        return 'bg-blue-100 text-blue-800';
      case 'Pronto':
        return 'bg-green-100 text-green-800';
      case 'Entregue':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Pedidos</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-black">Pedido #{order.id}</h3>
                <p className="text-gray-600">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></div>
                <span className="text-gray-900 capitalize">{order.status}</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {order.time} • {order.items.length} itens • R$ {order.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Pedido #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações do Cliente</h3>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">{selectedOrder.customerName}</p>
                <div className="h-px bg-gray-200 my-2"></div>
                <p className="text-gray-600">{selectedOrder.address}</p>
              </div>
            </div>

            {/* Itens e Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lista de Itens */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Itens do Pedido</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-900">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status e Informações */}
              <div className="space-y-4">
                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedOrder.status)}`}></div>
                    <span className="text-gray-900 capitalize">{selectedOrder.status}</span>
                  </div>
                </div>

                {/* Total e Pagamento */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pagamento</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total</span>
                      <span className="text-gray-900 font-medium">R$ {selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Método</span>
                      <span className="text-gray-900 capitalize">{selectedOrder.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Observações */}
            {selectedOrder.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Observações</h3>
                <p className="text-gray-600">{selectedOrder.notes}</p>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaPrint className="w-5 h-5" />
                Imprimir
              </button>
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 