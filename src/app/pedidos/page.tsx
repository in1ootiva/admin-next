"use client";

import { useState } from 'react';
import Modal from '@/components/Modal';
import { FaWhatsapp, FaPrint } from 'react-icons/fa';

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
    address: 'Rua das Flores, 123 - Centro',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Sem cebola no hambúrguer'
  },
  {
    id: 2,
    customerName: 'Maria Santos',
    items: ['X-Salada', 'Milk Shake'],
    total: 35.90,
    status: 'em rota',
    time: '12:45',
    address: 'Av. Principal, 456 - Jardim',
    paymentMethod: 'Dinheiro',
    notes: ''
  }
];

const statusOptions = [
  { value: 'cancelado', label: 'Cancelado', color: 'bg-red-500' },
  { value: 'em preparo', label: 'Em Preparo', color: 'bg-yellow-500' },
  { value: 'em rota', label: 'Em Rota', color: 'bg-blue-500' },
  { value: 'entregue', label: 'Entregue', color: 'bg-green-500' }
];

export default function PedidosPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handlePrint = () => {
    if (!selectedOrder) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Pedido #${selectedOrder.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .section { margin-bottom: 20px; }
              .section-title { font-weight: bold; margin-bottom: 10px; }
              .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
              .total { font-weight: bold; margin-top: 10px; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Pedido #${selectedOrder.id}</h1>
              <p>Data: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="section">
              <div class="section-title">Cliente</div>
              <p>${selectedOrder.customerName}</p>
              <p>${selectedOrder.address}</p>
            </div>

            <div class="section">
              <div class="section-title">Itens</div>
              ${selectedOrder.items.map(item => `
                <div class="item">
                  <span>${item}</span>
                </div>
              `).join('')}
              <div class="total">
                Total: R$ ${selectedOrder.total.toFixed(2)}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Informações Adicionais</div>
              <p>Status: ${selectedOrder.status}</p>
              <p>Forma de Pagamento: ${selectedOrder.paymentMethod}</p>
              ${selectedOrder.notes ? `<p>Observações: ${selectedOrder.notes}</p>` : ''}
            </div>

            <div class="footer">
              <p>Impresso em: ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleWhatsApp = () => {
    if (!selectedOrder) return;

    const message = `
*Pedido #${selectedOrder.id}*
Data: ${new Date().toLocaleDateString()}

*Cliente:* ${selectedOrder.customerName}
*Endereço:* ${selectedOrder.address}

*Itens:*
${selectedOrder.items.map(item => `- ${item}`).join('\n')}

*Total:* R$ ${selectedOrder.total.toFixed(2)}
*Status:* ${selectedOrder.status}
*Forma de Pagamento:* ${selectedOrder.paymentMethod}
${selectedOrder.notes ? `\n*Observações:* ${selectedOrder.notes}` : ''}
    `.trim();

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
                <p className="text-gray-600">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  order.status === 'cancelado' ? 'bg-red-500' :
                  order.status === 'em preparo' ? 'bg-yellow-500' :
                  order.status === 'em rota' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}></div>
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
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOrder.status === 'cancelado' ? 'bg-red-500' :
                      selectedOrder.status === 'em preparo' ? 'bg-yellow-500' :
                      selectedOrder.status === 'em rota' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}></div>
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