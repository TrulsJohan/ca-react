import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import {
    RenderHome,
    RenderProduct,
    RenderCart,
    RenderCheckout,
    RenderContact,
} from './routes';

const Layout = () => (
    <>
        <Header />
        <main className="container mx-auto p-4">
            <Outlet />
        </main>
        <Footer />
    </>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <RenderHome />,
            },
            {
                path: 'product',
                element: <RenderProduct />,
            },
            {
                path: 'cart',
                element: <RenderCart />,
            },
            {
                path: 'checkout',
                element: <RenderCheckout />,
            },
            {
                path: 'contact',
                element: <RenderContact />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
