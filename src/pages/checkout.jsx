import { useCart } from '../stores/cart';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function RenderCheckout() {
    const {
        items,
        removeAll,
        getTotalPrice,
    } = useCart();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [purchaseComplete, setPurchaseComplete] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePurchase = (e) => {
        e.preventDefault();
        if (
            formData.fullName &&
            formData.email &&
            formData.address &&
            formData.cardNumber &&
            formData.expiry &&
            formData.cvv
        ) {
            setPurchaseComplete(true);
            removeAll();
        } else {
            alert('Please fill in all fields.');
        }
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
                <div className="checkout-details">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>
                    <ul className="space-y-2 mb-6">
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
                                    className="flex justify-between">
                                    <span>
                                        {item.title} (x{item.quantity})
                                    </span>
                                    <span>
                                        $
                                        {(validPrice * item.quantity).toFixed(
                                            2
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-lg font-bold mb-6">
                        Total: ${getTotalPrice().toFixed(2)}
                    </p>

                    <h2 className="text-xl font-semibold mb-4">
                        Shipping Information
                    </h2>
                    <form onSubmit={handlePurchase} className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>

                        <h2 className="text-xl font-semibold mb-4">
                            Payment Details
                        </h2>
                        <div>
                            <label htmlFor="cardNumber" className="block mb-1">
                                Card Number
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full"
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="expiry" className="block mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiry"
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="cvv" className="block mb-1">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full">
                            Purchase
                        </button>
                    </form>
                </div>
            ) : (
                <p>Your cart is empty. Please add items to checkout.</p>
            )}
        </>
    );
}
