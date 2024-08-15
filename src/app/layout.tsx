import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Interactive comments section",
  description: "Interactive comments section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className="bg-light-gray-200">{children}</body>
      </StoreProvider>
    </html>
  );
}
