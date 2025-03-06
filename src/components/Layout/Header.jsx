import { Link } from 'react-router-dom';
import { CartIcon } from './CartIcon';
import Logo from '../../assets/Logo.svg';
import Menu from '../../assets/menu.svg';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-stone-400 text-gray-900 px-6 py-4 shadow-md font-sans sm:px-20 md:px-40">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Store Logo"
                        className="h-8 w-8 sm:h-10 sm:w-10"
                    />
                </Link>
                <div className="hidden sm:flex items-center gap-6">
                    <Link
                        to="/"
                        className="font-heading text-lg hover:text-gray-200 transition-colors duration-200">
                        Home
                    </Link>
                    <Link
                        to="/contact"
                        className="font-heading text-lg hover:text-gray-200 transition-colors duration-200">
                        Contact
                    </Link>
                    <CartIcon />
                </div>
                <button className="sm:hidden" onClick={toggleMenu}>
                    <img src={Menu} alt="Menu" className="h-6 w-6" />
                </button>
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-stone-300 sm:hidden flex flex-col items-center gap-4 py-4 shadow-md">
                        <Link
                            to="/"
                            className="font-heading text-lg hover:text-gray-200 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link
                            to="/contact"
                            className="font-heading text-lg hover:text-gray-200 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </Link>
                        <div onClick={() => setIsMenuOpen(false)}>
                            <CartIcon />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
