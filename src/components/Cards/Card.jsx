import { Link } from 'react-router-dom';

export function Card({ product }) {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col h-[28rem] sm:h-[30rem] mt-4">
                <div className="flex-shrink-0">
                    <img
                        src={
                            product.image.url ||
                            'https://via.placeholder.com/256'
                        }
                        alt={product.image.alt || product.title}
                        className="h-64 w-full object-cover rounded-md mb-4"
                    />
                </div>
                <div className="flex flex-col flex-1 justify-between text-center">
                    <div>
                        <p className="text-lg font-semibold text-stone-800 line-clamp-2">
                            {product.title}
                        </p>
                        <div className="min-h-[2.5rem] flex items-center justify-center pt-2">
                            {product.discountedPrice &&
                            product.discountedPrice !== product.price ? (
                                <div className="flex flex-row gap-4 items-center">
                                    <p className="text-red-600 line-through text-sm">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <p className="text-xl font-bold text-green-600">
                                        ${product.discountedPrice.toFixed(2)}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-gray-900">
                            Rating: {product.rating}/5
                        </p>
                        <button className="mt-3 bg-stone-500 text-white rounded-md px-4 py-2 hover:bg-stone-300 transition-colors duration-200 w-full">
                            View Product
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
