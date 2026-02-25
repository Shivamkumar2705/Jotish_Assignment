import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://backend.jotish.in/backend_dev/gettabledata.php', {
                username: "test",
                password: "123456"
            });

            if (response.data && response.data.TABLE_DATA && response.data.TABLE_DATA.data) {
                const transformedData = response.data.TABLE_DATA.data.map((row, index) => ({
                    id: index,
                    name: row[0],
                    position: row[1],
                    office: row[2],
                    extn: row[3],
                    startDate: row[4],
                    salary: row[5],
                    salaryValue: parseInt(row[5].replace(/[$,]/g, ''))
                }));
                setData(transformedData);
            } else {
                throw new Error('Invalid data format received from API');
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <DataContext.Provider value={{ data, loading, error, refreshData: fetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
