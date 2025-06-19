import Footer from "@/app/components/common/Footer";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div>
      <div>
        {/* <Header /> */}
        <div className="px-4 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-success">On Table</h1>
            <p className="text-sm text-success-content">Order your favourite food!</p>
          </div>
        </div>

        <main className="md:mx-auto md:max-w-2xl">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
