import { useState, useEffect } from 'react';

export function usePost(URL) {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
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
    }, []);
    console.log(data);
    return { data, message };
}
