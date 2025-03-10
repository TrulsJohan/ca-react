export function CartItem({
    item,
    quantityOptions,
    onRemove,
    onQuantityChange,
}) {
    const priceToUse =
        item.discountedPrice !== undefined && !isNaN(item.discountedPrice)
            ? item.discountedPrice
            : item.price;
    const validPrice = !isNaN(priceToUse) ? Number(priceToUse) : 0;

    return (
        <li className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-8">
                <img
                    src={item.image.url || 'https://via.placeholder.com/64'}
                    alt={item.image.alt || item.title}
                    className="w-64 h-64 sm:w-32 sm:h-32 object-cover rounded-md"
                />
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.discountedPrice !== undefined &&
                    item.discountedPrice !== item.price ? (
                        <>
                            <p className="text-gray-500 line-through">
                                Regular Price: ${item.price.toFixed(2)}
                            </p>
                            <p>
                                Discounted Price: $
                                {item.discountedPrice.toFixed(2)}
                            </p>
                        </>
                    ) : (
                        <p>Price: ${item.price.toFixed(2)}</p>
                    )}
                    <div className="flex items-center mt-1">
                        <label htmlFor={`quantity-${item.id}`} className="mr-2">
                            Quantity:
                        </label>
                        <select
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) =>
                                onQuantityChange(
                                    item.id,
                                    parseInt(e.target.value)
                                )
                            }
                            className="border rounded p-1 w-16">
                            {quantityOptions.map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p>Subtotal: ${(validPrice * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button
                onClick={() => onRemove(item.id)}
                className="bg-stone-500 text-white rounded hover:bg-stone-300 p-2 sm:max-w-100">
                Remove
            </button>
        </li>
    );
}
