import React from 'react';
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';

const MetricCard = ({ icon, title, value, percentage }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <div className={`p-2 rounded-full ${
        icon === 'sales' ? 'bg-indigo-100' :
        icon === 'orders' ? 'bg-red-100' : 'bg-green-100'
      }`}>
        {icon === 'sales' && <BarChart2 className="text-indigo-600" size={24} />}
        {icon === 'orders' && <TrendingUp className="text-red-600" size={24} />}
        {icon === 'income' && <DollarSign className="text-green-600" size={24} />}
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-500">Last 24 Hours</p>
      <div className="flex items-center">
        <div className="w-16 h-16 relative">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={
                icon === 'sales' ? '#818CF8' :
                icon === 'orders' ? '#FCA5A5' : '#6EE7B7'
              }
              strokeWidth="8"
              strokeDasharray={`${percentage * 1.76} 176`}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  </div>
);

const OrderRow = ({ productName, productNumber, payment, status }) => (
  <tr className="border-b border-gray-100 last:border-b-0">
    <td className="py-3 text-sm text-gray-600">{productName}</td>
    <td className="py-3 text-sm text-gray-600">{productNumber}</td>
    <td className="py-3 text-sm text-gray-600">{payment}</td>
    <td className="py-3 text-sm">
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
        {status}
      </span>
    </td>
    <td className="py-3 text-sm text-blue-600">Details</td>
  </tr>
);

const DashboardComponent = () => {
  const orders = [
    { productName: 'Cocao Seeds', productNumber: '9883', payment: 'Due', status: 'Pending' },
    { productName: 'Cocao Seeds', productNumber: '9883', payment: 'Due', status: 'Pending' },
    { productName: 'Cocao Seeds', productNumber: '9883', payment: 'Due', status: 'Pending' },
    { productName: 'Cocao Seeds', productNumber: '9883', payment: 'Due', status: 'Pending' },
    { productName: 'Cocao Seeds', productNumber: '9883', payment: 'Due', status: 'Pending' },
  ];

  return (
    <div className="p-2  font-sans">
      <div className="grid grid-cols-3 gap-5 mb-6" >
        <MetricCard icon="sales" title="Total Sales" value="Fcfa25,000" percentage={81}/>
        <MetricCard icon="orders" title="Total Orders" value="117" percentage={73} />
        <MetricCard icon="income" title="Total Income" value="Fcfa25,000" percentage={95} />
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 h-[410px]">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-lg text-gray-700 border-b border-gray-100">
              <th className="pb-3 font-medium">Product Name</th>
              <th className="pb-3 font-medium">Product Number</th>
              <th className="pb-3 font-medium">Payment</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderRow key={index} {...order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardComponent;