import { Navbar, Footer } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import ContextProvider from "@/lib/context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce project",
  description: "Generated by Next and Sanity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} py-5 px-8 text-gray-800 min-h-[100vh] flex flex-col`}
      >
        <ContextProvider>
          <Toaster />
          <Navbar />
          <main className="mb-auto">{children}</main>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
