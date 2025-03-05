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
        <li className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
                <img
                    src={item.image.url || 'https://via.placeholder.com/64'}
                    alt={item.image.alt || item.title}
                    className="w-16 h-16 object-cover mr-4"
                />
                <div>
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
                className="bg-red-600 text-white rounded p-2 hover:bg-red-700">
                Remove
            </button>
        </li>
    );
}
