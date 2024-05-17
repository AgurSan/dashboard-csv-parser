import React, { useState, useEffect } from 'react'
import { MetricsTable, MonthlyMetricsChart } from './'
import { fetchGlobalMetrics } from '../services/apiService'

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

    return (
        <>
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
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                {/* TODO: Ajouter fonctionnalité à l'api pour afficher toutes les années + combiner saisie + déroulant*/}
                            </select>
                            <select
                                className="py-2 px-4 rounded-md bg-white text-blue-800 shadow-sm"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">All States</option>
                                <option value="California">California</option>
                                <option value="Texas">Texas</option>
                                {/* TODO: Ajouter fonctionnalité à l'api pour afficher tous les states + combiner saisie + déroulant*/}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {metrics && <MetricsTable metrics={metrics}/>}
                        {metrics && <MonthlyMetricsChart metrics={metrics}/>}
                    </div>
                </div>
            </div>
        </>
    )
}
