export function Review({ review }) {
    return (
        <li className="border-b pb-2">
            <p className="font-semibold">{review.username}</p>
            <p className="text-sm">Rating: {review.rating}/5</p>
            <p>{review.description}</p>
        </li>
    );
}
