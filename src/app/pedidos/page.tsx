"use client";

import { useState, useRef } from 'react';
import Modal from '@/components/Modal';

interface Order {
  id: number;
  customerName: string;
  items: string[];
  total: number;
  status: string;
  time: string;
  address: string;
  paymentMethod: string;
  notes: string;
}

const orders: Order[] = [
  {
    id: 1,
    customerName: 'João Silva',
    items: ['X-Burger', 'Batata Frita', 'Coca-Cola'],
    total: 49.70,
    status: 'em preparo',
    time: '12:30',
    address: 'Rua das Flores, 123',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Sem cebola no hambúrguer'
  },
  {
    id: 2,
    customerName: 'Maria Santos',
    items: ['X-Salada', 'Refrigerante'],
    total: 35.90,
    status: 'entregue',
    time: '12:15',
    address: 'Av. Principal, 456',
    paymentMethod: 'Dinheiro',
    notes: ''
  }
];

const statusOptions = [
  { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
  { value: 'em preparo', label: 'Em preparo', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'em rota', label: 'Em rota', color: 'bg-blue-100 text-blue-800' },
  { value: 'entregue', label: 'Entregue', color: 'bg-green-100 text-green-800' }
];

export default function PedidosPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const statusMenuRef = useRef<HTMLDivElement>(null);

  const handleStatusChange = (status: string) => {
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status });
      setIsStatusMenuOpen(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pedidos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
                <p className="text-gray-600">{order.customerName}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                statusOptions.find(s => s.value === order.status)?.color
              }`}>
                {statusOptions.find(s => s.value === order.status)?.label}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Horário: {order.time}</p>
              <p>Total: R$ {order.total.toFixed(2)}</p>
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
                      <span className="text-gray-900">{item}</span>
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
                    <div className={`w-3 h-3 rounded-full ${selectedOrder.status === 'cancelado' ? 'bg-red-500' : selectedOrder.status === 'em preparo' ? 'bg-yellow-500' : selectedOrder.status === 'em rota' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
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
          </div>
        )}
      </Modal>
    </div>
  );
} 