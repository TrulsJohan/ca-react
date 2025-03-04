import { usePost } from '../hooks/usePost';
import { useParams } from 'react-router-dom';
import { API_URL } from '../utility/constants';
import { useCart } from '../stores/cart';
import { useState } from 'react';

export function RenderProduct() {
    const params = useParams();
    const URL = `${API_URL}/${params.id}`;
    const { data, message } = usePost(URL);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (data) {
            addToCart(
                {
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    discountedPrice: data.discountedPrice,
                    description: data.description,
                    image: data.image,
                },
                quantity
            );
            setQuantity(1);
        }
    };

    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    if (!data || !data.image) {
        return (
            <>
                <h1>Welcome to product page!</h1>
                <p>Loading...</p>
                {message && <p className="mt-2">{message}</p>}
            </>
        );
    }

    const hasDiscount =
        data.discountedPrice !== undefined &&
        data.discountedPrice !== data.price;
    const discountAmount = hasDiscount ? data.price - data.discountedPrice : 0;
    const discountPercentage = hasDiscount
        ? ((discountAmount / data.price) * 100).toFixed(0)
        : 0;

    return (
        <>
            <h1>Welcome to product page!</h1>
            <div className="product-details">
                <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
                <p className="mb-4">{data.description}</p>
                <img
                    src={data.image.url || 'https://via.placeholder.com/300'}
                    alt={data.image.alt || data.title}
                    className="max-w-xs mb-4"
                />
                <div className="mb-4">
                    {hasDiscount ? (
                        <>
                            <p className="text-gray-500 line-through">
                                Original Price: ${data.price.toFixed(2)}
                            </p>
                            <p className="text-xl font-semibold text-green-600">
                                Discounted Price: $
                                {data.discountedPrice.toFixed(2)}
                            </p>
                            <p className="text-sm text-green-600">
                                You save: ${discountAmount.toFixed(2)} (
                                {discountPercentage}%)
                            </p>
                        </>
                    ) : (
                        <p className="text-xl font-semibold">
                            Price: ${data.price.toFixed(2)}
                        </p>
                    )}
                </div>
                <div className="quantity-selector my-4">
                    <label htmlFor="quantity" className="mr-2">
                        Quantity:
                    </label>
                    <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border rounded p-1 w-16">
                        {quantityOptions.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
                    Add to Cart
                </button>

                {/* Reviews Section */}
                {data.reviews && data.reviews.length > 0 ? (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                        <ul className="space-y-4">
                            {data.reviews.map((review) => (
                                <li key={review.id} className="border-b pb-2">
                                    <p className="font-semibold">
                                        {review.username}
                                    </p>
                                    <p className="text-sm">
                                        Rating: {review.rating}/5
                                    </p>
                                    <p>{review.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="mt-6">No reviews yet.</p>
                )}
            </div>
            {message && <p className="mt-2">{message}</p>}
        </>
    );
}
