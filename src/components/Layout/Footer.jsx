// components/Footer.js
export function Footer() {
    return (
        <footer className="bg-stone-400 text-gray-900 py-6 mt-8 font-sans">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
                <p className="text-sm sm:text-base">
                    © {new Date().getFullYear()} All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
