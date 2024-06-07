import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { NewsProvider } from "@/lib/contexts/news-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "News Project"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NewsProvider>
                    {children}
                </NewsProvider>
            </body>
        </html>
    )
}
