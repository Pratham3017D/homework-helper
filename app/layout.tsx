import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homework Helper — For Parents Who Want to Help",
  description:
    "Understand the topic in 2 minutes. Help your child in 10. A mobile-first AI educational assistant designed to help parents teach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
