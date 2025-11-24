import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Superblessed",
  description: "AI-powered blessing cards with Bible verses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Main content area - takes full width, but leaves space for sidebar on lg+ */}
        <div className="lg:mr-[280px]">{children}</div>

        {/* Fixed sidebar on right - only visible on lg+ */}
        <Sidebar />
      </body>
    </html>
  );
}
