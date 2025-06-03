import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

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
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
