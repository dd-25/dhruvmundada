import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhruv Mundada",
  description: "Backend engineer. Production systems, faster and harder to break.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
