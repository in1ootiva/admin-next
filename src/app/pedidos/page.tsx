"use client";

import { FunnelIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import Modal from '@/components/Modal';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaWhatsapp, FaPrint } from 'react-icons/fa';

const orders = [
  {
    id: 1,
    customer: 'João Silva',
    items: 'X-Burger, Batata Frita',
    total: 'R$ 41,80',
    status: 'Em preparo',
    time: '15:30',
    address: 'Rua das Flores, 123 - Centro',
    paymentMethod: 'Cartão de Crédito',
    phone: '(11) 98765-4321',
    notes: 'Sem cebola no lanche',
  },
  {
    id: 2,
    customer: 'Maria Santos',
    items: 'X-Bacon, Refrigerante',
    total: 'R$ 35,90',
    status: 'Entregue',
    time: '15:15',
    address: 'Av. Principal, 456 - Jardim América',
    paymentMethod: 'Dinheiro',
    phone: '(11) 91234-5678',
    notes: 'Entregar no portão',
  },
  // Adicione mais pedidos conforme necessário
];

const statusOptions = [
  { value: 'cancelado', label: 'Cancelado', color: 'text-red-600' },
  { value: 'em_preparo', label: 'Em preparo', color: 'text-yellow-600' },
  { value: 'em_rota', label: 'Em rota', color: 'text-blue-600' },
  { value: 'entregue', label: 'Entregue', color: 'text-green-600' },
];

export default function PedidosPage() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const statusMenuRef = useRef<HTMLDivElement>(null);

  const handleShareWhatsApp = (order: typeof orders[0]) => {
    const message = `*Pedido #${order.id}*\n\n` +
      `*Cliente:* ${order.customer}\n` +
      `*Itens:* ${order.items}\n` +
      `*Total:* ${order.total}\n` +
      `*Endereço:* ${order.address}\n` +
      `*Status:* ${order.status}\n` +
      `*Observações:* ${order.notes || 'Nenhuma'}`;

    const whatsappUrl = `https://wa.me/${order.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = (order: typeof orders[0]) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Pedido #${order.id}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #000;
                padding-bottom: 10px;
              }
              .info-group {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #4B5563;
              }
              .value {
                margin-top: 5px;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #6B7280;
              }
              @media print {
                body {
                  padding: 0;
                }
                .no-print {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Pedido #${order.id}</h1>
              <p>Data: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="info-group">
              <div class="label">Cliente</div>
              <div class="value">${order.customer}</div>
            </div>
            
            <div class="info-group">
              <div class="label">Telefone</div>
              <div class="value">${order.phone}</div>
            </div>
            
            <div class="info-group">
              <div class="label">Endereço</div>
              <div class="value">${order.address}</div>
            </div>
            
            <div class="info-group">
              <div class="label">Itens</div>
              <div class="value">${order.items}</div>
            </div>
            
            <div class="info-group">
              <div class="label">Total</div>
              <div class="value">${order.total}</div>
            </div>
            
            <div class="info-group">
              <div class="label">Forma de Pagamento</div>
              <div class="value">${order.paymentMethod}</div>
            </div>
            
            <div class="info-group">
              <div class="label">Status</div>
              <div class="value">${order.status}</div>
            </div>
            
            ${order.notes ? `
            <div class="info-group">
              <div class="label">Observações</div>
              <div class="value">${order.notes}</div>
            </div>
            ` : ''}
            
            <div class="footer">
              <p>Impresso em ${new Date().toLocaleString()}</p>
            </div>

            <div class="no-print" style="text-align: center; margin-top: 20px;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #4F46E5; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Imprimir
              </button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedOrder) {
      // Aqui você implementaria a lógica para atualizar o status no backend
      console.log('Atualizando status do pedido', selectedOrder.id, 'para', status);
      setSelectedOrder({
        ...selectedOrder,
        status: statusOptions.find(option => option.value === status)?.label || status
      });
      setIsStatusMenuOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Pedidos</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            Filtrar
          </button>
        </div>
      </div>

      {/* Aviso para dispositivos móveis */}
      <div className="lg:hidden bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Toque em um pedido para ver mais detalhes
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        {/* Versão Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Itens
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endereço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr 
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        statusOptions.find(s => s.value === order.status)?.color.replace('text', 'bg') || 'bg-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        statusOptions.find(s => s.value === order.status)?.color || 'text-gray-600'
                      }`}>
                        {statusOptions.find(s => s.value === order.status)?.label || order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Versão Mobile */}
        <div className="lg:hidden">
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="p-4 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">#{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      statusOptions.find(s => s.value === order.status)?.color.replace('text', 'bg') || 'bg-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      statusOptions.find(s => s.value === order.status)?.color || 'text-gray-600'
                    }`}>
                      {statusOptions.find(s => s.value === order.status)?.label || order.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500">{order.time}</p>
                  <p className="text-sm font-medium text-gray-900">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Pedido #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.customer}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Telefone</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.phone}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-500">Endereço</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.address}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Forma de Pagamento</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.status}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-500">Itens</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.items}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-500">Total</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.total}</p>
              </div>
              {selectedOrder.notes && (
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Observações</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end items-center space-x-3">
              <button
                type="button"
                onClick={() => handleShareWhatsApp(selectedOrder)}
                className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                title="Compartilhar no WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handlePrint(selectedOrder)}
                className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                title="Imprimir Pedido"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
              <div className="relative" ref={statusMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Atualizar Status
                </button>
                {isStatusMenuOpen && (
                  <div 
                    className="absolute bottom-full mb-2 right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleStatusChange(option.value)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                          role="menuitem"
                        >
                          <span className={`w-2 h-2 rounded-full ${option.color.replace('text', 'bg')}`} />
                          <span className={option.color}>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 