import type { Metadata } from "next";
import { Press_Start_2P, Rubik } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "jahpoddesistir — Já posso desistir?",
  description:
    "A resposta é sempre NÃO. Estuda pra ficar rico logo. Landing divertida da família jahpod.",
  openGraph: {
    title: "jahpoddesistir — Já posso desistir?",
    description: "A resposta é sempre NÃO. Estuda pra ficar rico logo.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${pressStart.variable} ${rubik.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
