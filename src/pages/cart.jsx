import { useCart } from '../stores/cart';
import { Link } from 'react-router-dom';

export function RenderCart() {
    const {
        items,
        removeFromCart,
        removeAll,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
    } = useCart();

    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <>
            <h1>Welcome to cart page!</h1>
            {items.length > 0 ? (
                <div className="cart-details">
                    <ul className="space-y-4">
                        {items.map((item) => {
                            const priceToUse =
                                item.discountedPrice !== undefined &&
                                !isNaN(item.discountedPrice)
                                    ? item.discountedPrice
                                    : item.price;
                            const validPrice = !isNaN(priceToUse)
                                ? Number(priceToUse)
                                : 0;
                            return (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <img
                                            src={item.image.url}
                                            alt={item.image.alt || item.title}
                                            className="w-16 h-16 object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="font-semibold">
                                                {item.title}
                                            </h3>
                                            {item.discountedPrice !==
                                                undefined &&
                                            item.discountedPrice !==
                                                item.price ? (
                                                <>
                                                    <p className="text-gray-500 line-through">
                                                        Regular Price: $
                                                        {item.price.toFixed(2)}
                                                    </p>
                                                    <p>
                                                        Discounted Price: $
                                                        {item.discountedPrice.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </>
                                            ) : (
                                                <p>
                                                    Price: $
                                                    {item.price.toFixed(2)}
                                                </p>
                                            )}
                                            <div className="flex items-center mt-1">
                                                <label
                                                    htmlFor={`quantity-${item.id}`}
                                                    className="mr-2">
                                                    Quantity:
                                                </label>
                                                <select
                                                    id={`quantity-${item.id}`}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className="border rounded p-1 w-16">
                                                    {quantityOptions.map(
                                                        (num) => (
                                                            <option
                                                                key={num}
                                                                value={num}>
                                                                {num}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <p>
                                                Subtotal: $
                                                {(
                                                    validPrice * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-red-600 text-white rounded p-2 hover:bg-red-700">
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-6">
                        <p className="text-lg">
                            Total Items: {getTotalItems()}
                        </p>
                        <p className="text-lg font-bold">
                            Total Price: ${getTotalPrice().toFixed(2)}
                        </p>
                        <button
                            onClick={removeAll}
                            className="mt-4 bg-gray-600 text-white rounded p-2 hover:bg-gray-700">
                            Clear Cart
                        </button>
                        <Link to="/checkout">
                            <button className="mt-4 ml-4 bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </>
    );
}
