import { Link } from 'react-router-dom';
import { CartIcon } from './CartIcon';

export function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="space-x-6">
                    <Link to="/" className="hover:text-blue-300">
                        Home
                    </Link>
                    <Link to="/contact" className="hover:text-blue-300">
                        Contact
                    </Link>
                </div>
                <CartIcon />
            </nav>
        </header>
    );
}
