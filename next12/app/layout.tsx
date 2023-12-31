import Navbar from "./components/Navbar";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bart&apos;s Blog",
  description: "Create by Bart Van Hoey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <Navbar />
        <main className="px-10 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
          {children}</main>
      </body>
    </html>
  );
}
