import SideDrawer from "@/app/components/SideDrawer";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AdminLayout({ children }) {
    return (
        <div>
            <SideDrawer pageContent={
                <div>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
            } />
        </div>
    );
}