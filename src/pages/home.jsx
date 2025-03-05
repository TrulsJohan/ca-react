import { usePosts } from '../hooks/usePosts';
import { useState } from 'react';
import { Card } from '../components/Cards/card';

export function RenderHome() {
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const { data, message } = usePosts(sortOrder);

    const filteredData = data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by product title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 w-full max-w-md"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedData.length > 0 ? (
                    paginatedData.map((product) => (
                        <Card key={product.id} product={product} />
                    ))
                ) : data.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <p>No products match your search.</p>
                )}
            </div>
            <div className="mt-6 flex items-center space-x-4">
                <button
                    className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}>
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}>
                    Next
                </button>
                <button
                    className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                    onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    }>
                    Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
                </button>
            </div>
        </>
    );
}
