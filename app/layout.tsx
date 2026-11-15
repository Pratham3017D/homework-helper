import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Homework Helper — For Parents Who Want to Help",
    template: "%s | Homework Helper",
  },
  description:
    "Understand the topic in 2 minutes. Help your child in 10. A mobile-first AI educational guide designed to help parents confidently explain Grade 1–8 homework.",
  keywords: [
    "homework helper",
    "parent tutoring guide",
    "grade 1 to 8 homework",
    "teaching notes for parents",
    "math explanations",
    "multilingual homework help",
    "educational AI",
  ],
  authors: [{ name: "Homework Helper Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://homework-helper.app",
    title: "Homework Helper — For Parents Who Want to Help",
    description:
      "Understand the topic in 2 minutes. Help your child in 10. In-depth parent teaching notes, intuition, and practice questions in 6 languages.",
    siteName: "Homework Helper",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homework Helper — For Parents Who Want to Help",
    description:
      "Understand the topic in 2 minutes. Help your child in 10. Intuition, complete teaching notes, and 5 progressive problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
