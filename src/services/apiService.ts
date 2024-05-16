import axios from "axios";

const API_URL = 'http://localhost:3000';

interface MonthlyMetric {
    revenue: number;
    orders: number;
}

interface GlobalMetrics {
    totalRevenue: number;
    avgRevenuePerOrder: number;
    uniqueCustomers: number;
    monthlyMetrics: { [month: string]: MonthlyMetric };
}

/**
 * Fetches global metrics based on the year and state provided.
 *
 * @param {number} year - The year for which metrics are fetched
 * @param {string} state - The state for which metrics are fetched
 * @return {Promise<GlobalMetrics>} The data representing the global metrics
 */
export async function fetchGlobalMetrics(year?: number, state?: string): Promise<GlobalMetrics> {
    const url = `${API_URL}/metrics${year ? `?year=${year}` : ''}${state ? `&state=${state}` : ''}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error('Erreur lors de la récupération des données');
    }
}