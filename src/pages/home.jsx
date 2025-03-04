import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useState } from 'react';

export function RenderHome() {
    const [sortOrder, setSortOrder] = useState('asc');
    const [limit, setLimit] = useState(10);
    const { data, message } = usePosts(sortOrder, limit);

    return (
        <>
            {data.length > 0 ? (
                data.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <div>
                            <p>{product.title}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
            <button
                className="bg-blue-600 rounded p-2"
                onClick={() => setLimit(limit + 10)}>
                Show more
            </button>
            <button
                className="bg-blue-600 rounded p-2 ml-2"
                onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }>
                Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>
        </>
    );
}
