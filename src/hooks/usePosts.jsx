import { API_URL } from '../utility/constants';
import { useState, useEffect } from 'react';

export function usePosts(sortOrder, limit) {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${API_URL}?sortOrder=${sortOrder}&limit=${limit}`
                );
                const data = await res.json();
                if (res.ok) {
                    setMessage('Success fetching data.');
                    setData(data.data);
                } else {
                    setMessage(data.message || 'Failed to fetch data.');
                }
            } catch (error) {
                setMessage('Error occurred: ' + error.message);
            }
        };
        fetchData();
    }, [sortOrder, limit]);
    console.log(data);
    return { data, message };
}
