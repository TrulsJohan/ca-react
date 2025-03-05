import { useCart } from '../stores/cart';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/Cart/CartItem';

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
            {items.length > 0 ? (
                <div className="cart-details">
                    <ul className="space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                quantityOptions={quantityOptions}
                                onRemove={removeFromCart}
                                onQuantityChange={updateQuantity}
                            />
                        ))}
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
