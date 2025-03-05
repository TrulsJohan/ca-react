import { Link } from 'react-router-dom';

export function Card({ product }) {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center">
                <img
                    src={product.image.url || 'https://via.placeholder.com/128'}
                    alt={product.image.alt || product.title}
                    className="h-32 w-32 object-cover rounded-md mb-2"
                />
                <p className="text-lg font-semibold text-gray-800 text-center line-clamp-2">
                    {product.title}
                </p>
                {product.discountedPrice &&
                product.discountedPrice !== product.price ? (
                    <div className="text-center">
                        <p className="text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xl font-bold text-green-600">
                            ${product.discountedPrice.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-xl font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                    </p>
                )}
                <p className="text-sm text-yellow-500 mt-1">
                    Rating: {product.rating}/5
                </p>
                <button className="mt-3 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors duration-200">
                    View Product
                </button>
            </div>
        </Link>
    );
}
