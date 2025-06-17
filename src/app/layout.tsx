import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Painel Administrativo - Menu Digital",
  description: "Painel de gerenciamento do Menu Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <div className="lg:pl-64">
            <main className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
