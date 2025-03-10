export function Review({ review }) {
    return (
        <li className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col mt-6 gap-1">
            <p className="font-semibold">{review.username}</p>
            <p className="text-sm">Rating: {review.rating}/5</p>
            <p>{review.description}</p>
        </li>
    );
}
