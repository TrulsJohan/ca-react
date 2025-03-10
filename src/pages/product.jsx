import { usePost } from '../hooks/usePost';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../utility/constants';
import { useCart } from '../stores/cart';
import { useState } from 'react';
import { Review } from '../components/Reviews/Review';
import ArrowRight from '../assets/arrowright.svg';

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
            <div className="product-details px-6">
                <div className="flex flex-row gap-4 items-center py-8">
                    <Link to={'/'}>
                        <button className="bg-stone-300 text-white rounded p-1 hover:bg-stone-200 disabled:bg-stone-100">
                            <img src={ArrowRight} alt="back"></img>
                        </button>
                    </Link>
                    <h2 className="text-2xl font-bold">{data.title}</h2>
                </div>
                <img
                    src={data.image.url || 'https://via.placeholder.com/300'}
                    alt={data.image.alt || data.title}
                    className="w-full mb-8"
                />
                <div className="mb-4">
                    {hasDiscount ? (
                        <div className="flex flex-col gap-2">
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
                        </div>
                    ) : (
                        <p className="text-xl font-semibold">
                            Price: ${data.price.toFixed(2)}
                        </p>
                    )}
                </div>
                <div className="flex flex-row gap-4 quantity-selector my-8">
                    <button
                        onClick={handleAddToCart}
                        className="bg-stone-500 text-white rounded p-2 hover:bg-stone-300">
                        Add to Cart
                    </button>
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
                <p className="mb-4">{data.description}</p>
                {data.reviews && data.reviews.length > 0 ? (
                    <div className="mt-8 py-8">
                        <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                            Reviews
                        </h3>
                        <ul className="space-y-4">
                            {data.reviews.map((review) => (
                                <Review key={review.id} review={review} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="mt-6">No reviews yet.</p>
                )}
            </div>
        </>
    );
}
