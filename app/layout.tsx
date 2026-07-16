import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
    title: "Weather App",
    description: "A beautiful weather app like Ventusky",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" className="h-full antialiased">
            <body className="w-screen h-screen font-vazir overflow-hidden">
                {children}
            </body>
        </html>
    );
}