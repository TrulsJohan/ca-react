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

    return (
        <>
            <h1>Welcome to product page!</h1>
            {data.id ? (
                <div className="product-details">
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <img
                        src={data.image.url}
                        alt={data.image.alt || data.title}
                        className="max-w-xs"
                    />
                    <p>Price: ${data.price.toFixed(2)}</p>
                    <div className="quantity-selector my-4">
                        <label htmlFor="quantity" className="mr-2">
                            Quantity:
                        </label>
                        <select
                            id="quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
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
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {message && <p className="mt-2">{message}</p>}
        </>
    );
}
