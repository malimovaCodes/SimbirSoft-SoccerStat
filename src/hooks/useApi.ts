import { useState, useEffect } from 'react';
import api from '../api/api';
import type { UseApiResult } from '../models/types';

export function useApi<T>(endpoint: string, dependencies: any[] = []): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get<T>(endpoint);
            setData(response.data);
            setError(null);
        } catch (err: any) {
            if (err.response?.status === 429) {
                setError('Превышен лимит запросов. Попробуйте позже.');
            } else {
                setError('Не удалось загрузить данные.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, dependencies); 

    return { data, loading, error, refetch: fetchData };
}