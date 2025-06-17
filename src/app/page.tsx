"use client";

import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  MapPinIcon,
  CreditCardIcon,
  BanknotesIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const paymentStats = [
  { name: 'Cartão de Crédito', value: 'R$ 2.345,67', icon: CreditCardIcon, percentage: '45%' },
  { name: 'Dinheiro', value: 'R$ 1.234,56', icon: BanknotesIcon, percentage: '25%' },
  { name: 'PIX', value: 'R$ 1.567,89', icon: WalletIcon, percentage: '30%' },
];

const totalStats = [
  { name: 'Faturamento Total', value: 'R$ 5.148,12', icon: CurrencyDollarIcon },
  { name: 'Pedidos', value: '45', icon: ShoppingBagIcon },
  { name: 'Ticket Médio', value: 'R$ 114,40', icon: ClockIcon },
  { name: 'Entregas', value: '38', icon: MapPinIcon },
];

const periods = [
  { name: 'Hoje', value: 'day' },
  { name: 'Esta Semana', value: 'week' },
  { name: 'Este Mês', value: 'month' },
];

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState('day');

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // Aqui você pode adicionar a lógica para buscar os dados do período selecionado
    console.log('Período selecionado:', period);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => handlePeriodChange(period.value)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                selectedPeriod === period.value
                  ? 'bg-indigo-600 text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* KPIs Principais */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {totalStats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-3 py-4 sm:px-4 sm:py-5 shadow"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-2 sm:p-3">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-12 sm:ml-16 truncate text-xs sm:text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-12 sm:ml-16 flex items-baseline">
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Entradas por Forma de Pagamento */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Entradas por Forma de Pagamento</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paymentStats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-3 py-4 sm:px-4 sm:py-5 shadow border border-gray-200"
            >
              <dt>
                <div className="absolute rounded-md bg-green-500 p-2 sm:p-3">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-12 sm:ml-16 truncate text-xs sm:text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-12 sm:ml-16 flex items-baseline">
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="ml-1 sm:ml-2 flex items-baseline text-xs sm:text-sm font-semibold text-green-600">
                  {stat.percentage}
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de Evolução */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Evolução das Entradas</h2>
        <div className="h-48 sm:h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-sm sm:text-base">Gráfico de evolução das entradas será implementado aqui</p>
        </div>
      </div>
    </div>
  );
}
