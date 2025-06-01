import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Banner from '@/app/components/Banner';

import "./globals.css";

export const metadata = {
  title: "On Table",
  description: "powered by On Table",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Banner />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
