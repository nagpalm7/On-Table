import React from "react";
import SideDrawer from "@/app/components/common/SideDrawer";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import getAuthUser from "@/lib/getAuthUser";

export default async function MainLayout({ children }) {
    const user = await getAuthUser();
    const userType = user?.userType;
    return (
        <div>
            <SideDrawer
                pageContent={
                    <div>
                        <Header />
                        <main>
                            {children}
                        </main>
                        <Footer />
                    </div>
                }
                userType={userType}
            />
        </div>
    );
}