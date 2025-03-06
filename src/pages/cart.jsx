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
                    <ul className="flex flex-col py-8 gap-6 px-6 sm:px-20 md:px-40">
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
                    <div className="pb-8 px-6 sm:px-20 md:px-40">
                        <p className="text-lg">
                            Total Items: {getTotalItems()}
                        </p>
                        <p className="text-lg font-bold">
                            Total Price: ${getTotalPrice().toFixed(2)}
                        </p>
                        <button
                            onClick={removeAll}
                            className="mt-4 bg-red-400 text-white rounded p-2 hover:bg-stone-100">
                            Clear Cart
                        </button>
                        <Link to="/checkout">
                            <button className="mt-4 ml-4 bg-stone-500 text-white rounded p-2 hover:bg-stone-300">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col w-full items-center justify-center py-32 gap-6 px-6 sm:px-20 md:px-40'>
                    <p className='text-center'>
                        Your cart is empty. Why not check out some of our
                        products?
                    </p>
                    <Link to={'/'}>
                        <button className='bg-stone-500 text-white rounded p-2'>
                            See Products
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
}
