import { usePosts } from '../hooks/usePosts';
import { useState, useEffect } from 'react';
import { Card } from '../components/Cards/Card';
import Filter from '../assets/filter.svg';
import ArrowRight from '../assets/arrowright.svg';
import ArrowLeft from '../assets/arrowleft.svg';

export function RenderHome() {
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const { data, message } = usePosts(sortOrder);

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

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
            <div className="flex flex-row w-full justify-center items-center p-8 gap-4">
                <input
                    type="text"
                    placeholder="Search by product title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 w-full max-w-md"
                />
                <button
                    className="bg-stone-300 text-white rounded p-2 hover:bg-stone-200"
                    onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    }>
                    <img src={Filter} alt="filter"></img>
                </button>
            </div>
            <div className='flex flex-row p-4 px-6 sm:px-20 md:px-40'>
                <p>Order {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</p>
            </div>
            <div className="grid grid-cols-1 px-6 sm:grid-cols-2 sm:px-20 md:grid-cols-2 md:px-40 gap-6">
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
            <div className="mt-6 flex items-center justify-center space-x-4 p-8">
                <button
                    className="bg-stone-300 text-white rounded p-2 hover:bg-stone-200 disabled:bg-stone-100"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}>
                    <img src={ArrowRight} alt="previous"></img>
                </button>
                <span>
                    {page} of {totalPages}
                </span>
                <button
                    className="bg-stone-300 text-white rounded p-2 hover:bg-stone-200 disabled:bg-stone-100"
                    onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}>
                    <img src={ArrowLeft} alt="next"></img>
                </button>
            </div>
        </>
    );
}
