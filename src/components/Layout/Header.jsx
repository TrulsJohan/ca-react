import { Link } from "react-router-dom";

export function Header() {
    return (
        <>
            <header>
                <Link to={''}>Home</Link>
                <Link to={'/product'}>Product</Link>
                <Link to={'/cart'}>Cart</Link>
                <Link to={'/checkout'}>Checkout</Link>
                <Link to={'/contact'}>Contact</Link>
            </header>
        </>
    );
}
