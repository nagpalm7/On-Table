import Footer from "@/app/components/common/Footer";
import Account from "@/app/components/user/Account";
import Providers from "@/app/Providers";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div>
      <div>
        {/* <Header /> */}
        <Providers>
          <div className="px-4 pt-6 pb-2 flex items-center justify-between">
            <div>
              <h1 className="font-bold text-xl text-success">On Table</h1>
              <p className="text-sm">Order your favourite food!</p>
              <Account />
            </div>
          </div>

          <main className="md:mx-auto md:max-w-2xl">
            {children}
          </main>
        </Providers>
      </div>
      <Footer />
    </div>
  );
}
