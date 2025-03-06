export function Footer() {
    return (
        <footer className="bg-stone-400 text-gray-900 py-6 font-sans">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <p className="text-sm sm:text-base">
                    © {new Date().getFullYear()} All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
