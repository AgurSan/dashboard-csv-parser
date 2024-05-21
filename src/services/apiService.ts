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
 * @param {number} [year] - The year for which metrics are fetched (optional).
 * @param {string} [state] - The state for which metrics are fetched (optional).
 * @returns {Promise<GlobalMetrics>} A promise that resolves to the global metrics data.
 * @throws Will throw an error if the data fetch fails.
 */
export async function fetchGlobalMetrics(year?: number, state?: string): Promise<GlobalMetrics> {
    let url = `${API_URL}/metrics`;

    const params: string[] = [];
    if (year) params.push(`year=${year}`);
    if (state) params.push(`state=${state}`);

    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    try {
        const response = await axios.get<GlobalMetrics>(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error('Erreur lors de la récupération des données');
    }
}

/**
 * Fetches metadata from the API, including available years and states.
 *
 * @return {Promise<{ years: string[]; states: string[] }>} A promise that resolves to an object containing arrays of available years and states.
 * @throws Will throw an error if the metadata fetch fails.
 */
export async function fetchMetadata(): Promise<{ years: string[]; states: string[] }> {
    const url = `${API_URL}/metadata`;

    try {
        const response = await axios.get<{ years: string[]; states: string[] }>(url);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des métadonnées:', error);
        throw new Error('Erreur lors de la récupération des métadonnées');
    }
}