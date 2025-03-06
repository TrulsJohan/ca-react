import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

 export const Layout = () => (
    <>
        <Header />
        <main className="grow bg-stone-100">
            <Outlet />
        </main>
        <Footer />
    </>
);
