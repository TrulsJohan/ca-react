import { usePost } from '../hooks/usePost';
import { useParams } from 'react-router-dom';
import { API_URL } from '../utility/constants';
import { useCart } from '../stores/cart';

export function RenderProduct() {
    const params = useParams();
    const URL = `${API_URL}/${params.id}`;
    const { data, message } = usePost(URL);
    const { addToCart } = useCart();

    return (
        <>
            <h1>Welecome to product page!</h1>
            {data ? (
                <div key={data.id}>
                    <p>{data.title}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
