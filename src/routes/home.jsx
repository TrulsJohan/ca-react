import { usePosts } from '../api/getAllPosts';

export function RenderHome() {
    const { data, message } = usePosts();

    return (
        <>
            {data.length > 0 ? (
                data.map((product) => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
