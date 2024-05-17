import React from 'react';

export const MetricsTable: React.FC = ({ metrics }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Global Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <p className="text-gray-500 mb-2">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-800">${metrics.totalRevenue.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-gray-500 mb-2">Avg. Revenue per Order</p>
                    <p className="text-2xl font-bold text-blue-800">${metrics.avgRevenuePerOrder.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-gray-500 mb-2">Unique Customers</p>
                    <p className="text-2xl font-bold text-blue-800">{metrics.uniqueCustomers}</p>
                </div>
            </div>
        </div>
    );
}
