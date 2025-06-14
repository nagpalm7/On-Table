import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
