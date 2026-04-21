import type { Metadata } from "next";
import "./globals.css";
import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
export const metadata: Metadata = {
  title: "Restoran",
  description: "Italian food delivery website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`min-h-screen h-screen flex flex-col`}
        >
          <Notification />
          <Navbar />
          <main className="scroll-smooth overflow-x-hidden flex-1">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
