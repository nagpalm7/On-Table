import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header 
        publicRoute={true}
      />
      <div>
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
