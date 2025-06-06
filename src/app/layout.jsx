import React from "react";
import "./globals.css";

export const metadata = {
  title: "On Table",
  description: "powered by On Table",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
 