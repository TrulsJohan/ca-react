import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/index';
import {
    RenderHome,
    RenderProduct,
    RenderCart,
    RenderCheckout,
    RenderContact,
} from './pages';

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
                path: 'product/:id',
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
