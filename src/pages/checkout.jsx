import { useCart } from '../stores/cart';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckoutForm } from '../components/Forms/Checkout';

export function RenderCheckout() {
    const { items, removeAll, getTotalPrice } = useCart();
    const [purchaseComplete, setPurchaseComplete] = useState(false);

    const handlePurchase = () => {
        setPurchaseComplete(true);
        removeAll();
    };

    if (purchaseComplete) {
        return (
            <>
                <h1>Thank You for Your Purchase!</h1>
                <p className="mt-4">
                    Your order has been successfully processed.
                </p>
                <Link to="/">
                    <button className="mt-6 bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
                        Back to Home
                    </button>
                </Link>
            </>
        );
    }

    return (
        <>
            <h1>Welcome to checkout page!</h1>
            {items.length > 0 ? (
                <CheckoutForm
                    items={items}
                    totalPrice={getTotalPrice()}
                    onSubmit={handlePurchase}
                />
            ) : (
                <p>Your cart is empty. Please add items to checkout.</p>
            )}
        </>
    );
}
