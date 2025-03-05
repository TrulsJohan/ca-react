import { useForm } from 'react-hook-form';

export function CheckoutForm({ items, totalPrice, onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            address: '',
            cardNumber: '',
            expiry: '',
            cvv: '',
        },
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <div className="checkout-details">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
                        <li key={item.id} className="flex justify-between">
                            <span>
                                {item.title} (x{item.quantity})
                            </span>
                            <span>
                                ${(validPrice * item.quantity).toFixed(2)}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <p className="text-lg font-bold mb-6">
                Total: ${totalPrice.toFixed(2)}
            </p>

            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        {...register('fullName', {
                            required: 'Full name is required',
                            minLength: {
                                value: 3,
                                message:
                                    'Full name must be at least 3 characters',
                            },
                        })}
                        className="border rounded p-2 w-full"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address',
                            },
                        })}
                        className="border rounded p-2 w-full"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="address" className="block mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        {...register('address', {
                            required: 'Address is required',
                            minLength: {
                                value: 3,
                                message:
                                    'Address must be at least 3 characters',
                            },
                        })}
                        className="border rounded p-2 w-full"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.address.message}
                        </p>
                    )}
                </div>

                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <div>
                    <label htmlFor="cardNumber" className="block mb-1">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        {...register('cardNumber', {
                            required: 'Card number is required',
                            pattern: {
                                value: /^\d{16}$/,
                                message: 'Card number must be 16 digits',
                            },
                        })}
                        className="border rounded p-2 w-full"
                        placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.cardNumber.message}
                        </p>
                    )}
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="expiry" className="block mb-1">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            id="expiry"
                            {...register('expiry', {
                                required: 'Expiry date is required',
                            })}
                            className="border rounded p-2 w-full"
                            placeholder="MM/YY"
                        />
                        {errors.expiry && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.expiry.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="cvv" className="block mb-1">
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            {...register('cvv', {
                                required: 'CVV is required',
                                pattern: {
                                    value: /^\d{3,4}$/,
                                    message: 'CVV must be 3 or 4 digits',
                                },
                            })}
                            className="border rounded p-2 w-full"
                            placeholder="123"
                        />
                        {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cvv.message}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 bg-green-600 text-white rounded p-2 hover:bg-green-700 w-full">
                    Purchase
                </button>
            </form>
        </div>
    );
}
