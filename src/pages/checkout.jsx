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
            <div className='flex flex-col w-full items-center text-center py-32 px-6 sm:px-20 md:px-40'>
                <h1>Thank You for Your Purchase!</h1>
                <p className="mt-4">
                    Your order has been successfully processed.
                </p>
                <Link to="/">
                    <button className="mt-6 bg-stone-500 text-white rounded p-2 hover:bg-stone-300">
                        Back to Home
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <>
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
