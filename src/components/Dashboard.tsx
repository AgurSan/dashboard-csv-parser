import React, { useState, useEffect } from 'react';
import {MetricsTable} from './MetricsTable';
import {MonthlyMetricsChart} from './MonthlyMetricsChart';
import { fetchGlobalMetrics, fetchGlobalMetaData } from '../services/apiService';

interface Metrics {
    totalRevenue: number;
    avgRevenuePerOrder: number;
    uniqueCustomers: number;
    monthlyMetrics: { [key: string]: { revenue: number; orders: number } };
}

export const Dashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [year, setYear] = useState('');
    const [state, setState] = useState('');
    const [years, setYears] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchGlobalMetrics(year ? parseInt(year) : undefined, state);
                setMetrics(data);
            } catch (error) {
                console.error('Error fetching global metrics:', error);
            }
        };

        fetchData();
    }, [year, state]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const metadata = await fetchGlobalMetaData();
                setYears(metadata.years);
                setStates(metadata.states);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        fetchMetadata();
    }, []);

    return (
        <div className='min-h-screen bg-blue-50 py-8'>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-blue-800'>Dashboard</h1>
                    <div className='flex space-x-4'>
                        <select
                            className="py-2 px-4 rounded-md bg-white text-blue-800 shadow-sm"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">All Years</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <select
                            className="py-2 px-4 rounded-md bg-white text-blue-800 shadow-sm"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="">All States</option>
                            {states.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-rows-auto gap-8">
                    {metrics && <MetricsTable metrics={metrics} />}
                    {metrics && <MonthlyMetricsChart metrics={metrics} />}
                </div>
            </div>
        </div>
    );
};