import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

export function RenderHome() {
    const { data, message } = usePosts();

    return (
        <>
            {data.length > 0 ? (
                data.map((product) => (
                    <Link key={product.id} to={'/product/' + product.id}>
                        <div>
                            <p>{product.title}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
