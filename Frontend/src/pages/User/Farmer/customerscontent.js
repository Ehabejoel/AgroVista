import React, { useState } from 'react';
import { Filter, MoreVertical } from 'lucide-react';

const MetricCard = ({ title, value, subtext1, subtext2 }) => (
  <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
    <div className="flex items-center mb-3">
      <div className={`w-3 h-3 rounded-full mr-3 ${title === 'Total Point' ? 'bg-orange-500' : title === 'Total Order' ? 'bg-cyan-500' : 'bg-red-500'}`}></div>
      <h3 className="text-base font-medium text-gray-600">{title}</h3>
    </div>
    <p className="text-3xl font-bold mb-3">{value}</p>
    <p className="text-sm text-gray-600">{subtext1}</p>
    <p className="text-sm text-gray-600">{subtext2}</p>
  </div>
);

const OrderRow = ({ id, date, type, employee, paymentMethod, amount, status }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-300">
        <td className="py-3 text-base text-blue-700">#{id}</td>
        <td className="py-3 text-base">{employee}</td>
        <td className="py-3 text-base">FCFA{amount}</td>
        <td className="py-3 text-base">
          <span className={`px-3 py-2 rounded-full text-sm ${
            status === 'Delivered' ? 'bg-green-200 text-green-800' :
            status === 'On way' ? 'bg-yellow-200 text-yellow-800' :
            'bg-red-200 text-red-800'
          }`}>
            {status}
          </span>
        </td>
        <td className="py-3 text-base text-center">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-700">
            <MoreVertical size={18} />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-gray-300 bg-gray-50">
          <td colSpan="5" className="py-3 text-base">
            <div className="flex flex-col space-y-2">
              <p><strong>Date & Time:</strong> {date}</p>
              <p><strong>Type:</strong> {type}</p>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const CustomersContent = () => {
  const orders = [
    { id: '00745', date: 'Fri, 04-30-21', type: 'ABA', employee: 'David Wise', paymentMethod: 'Bank Transfer', amount: '120,000', status: 'Delivered' },
    { id: '00343', date: 'Fri, 04-30-21', type: 'ABA', employee: 'Wade Warren', paymentMethod: 'Ewallets', amount: '90,000', status: 'On way' },
    { id: '00865', date: 'May 13, 2022', type: 'ABA', employee: 'Leslie Alexander', paymentMethod: 'Cash', amount: '240,000', status: 'Delivered' },
    { id: '00865', date: 'Mar 13, 2022', type: 'ABA', employee: 'Jacob Jones', paymentMethod: 'Direct Deposit', amount: '50,043', status: 'Canceled' },
    { id: '00865', date: 'Mar 13, 2022', type: 'ABA', employee: 'Robert Fox', paymentMethod: 'Direct Deposit', amount: '5,043', status: 'Canceled' },
  ];

  return (
    <div className="p-8 font-sans max-w-screen-lg mx-auto overflow-hidden">
      <div className="grid grid-cols-3 gap-6 mb-5">
        <MetricCard title="Total Orders" value="190" subtext1="This Week" />
        <MetricCard title="Total Sales" value="290" subtext1="This Week" />
        <MetricCard title="Total Visits" value="180" subtext1="Last Visit: 24 Aug 2024" />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">All Orders</h2>
          <button className="flex items-center text-base text-gray-700">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
        </div>
        <table className="w-full text-base min-w-full">
          <thead>
            <tr className="text-left text-base text-gray-600 border-b border-gray-300">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer Name</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-center">Actions</th>
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

export default CustomersContent;
