import type { Metadata } from "next";
import { Playfair_Display, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chand-e-Mahtab",
  description: "Moonlight of knowledge and youth - A bilingual blog sharing insights in English and Urdu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${playfairDisplay.variable} ${notoNastaliqUrdu.variable} antialiased`}
        style={{ backgroundColor: '#FAFBF8', color: '#14221C' }}
      >
        {children}
      </body>
    </html>
  );
}
