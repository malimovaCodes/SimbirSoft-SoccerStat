import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import axios from 'axios';
import type { UseApiResult } from '../models/apiResult.types';

export function useApi<T>(endpoint: string, dependencies: unknown[] = []): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get<T>(endpoint);
            setData(response.data);
            setError(null);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 429) {
                    setError('Превышен лимит запросов. Попробуйте позже.');
                } else {
                    setError('Не удалось загрузить данные.');
                }
            } else {
                setError('Не удалось загрузить данные.');
            }
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData, ...(dependencies as unknown[])]);

    return { data, loading, error, refetch: fetchData };
}