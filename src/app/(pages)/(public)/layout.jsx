import Footer from "@/app/components/common/Footer";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div>
      <div>
        {/* <Header /> */}
        <div className="px-4 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">On Table</h1>
            <p className="text-sm text-gray-500">Order your favourite food!</p>
          </div>

        </div>

        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
