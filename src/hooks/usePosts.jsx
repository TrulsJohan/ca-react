import { API_URL } from '../utility/constants';
import { useState, useEffect } from 'react';

export function usePosts(sortOrder) {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}?sortOrder=${sortOrder}`);
                const responseData = await res.json();
                if (res.ok) {
                    setMessage('Success fetching all products.');
                    setData(responseData.data || responseData);
                } else {
                    setMessage(responseData.message || 'Failed to fetch data.');
                }
            } catch (error) {
                setMessage('Error occurred: ' + error.message);
            }
        };
        fetchData();
    }, [sortOrder]);

    console.log(data);
    return { data, message };
}
