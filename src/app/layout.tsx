import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JC Encadernados - Sistema de Capas",
  description: "Sistema para gerenciamento de capas personalizadas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}