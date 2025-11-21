import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Bubrolinguo - Learn Polish from A1 to C1',
  description: 'Master Polish language with AI-powered lessons, 10,000 vocabulary words, and engaging characters. From complete beginner to advanced fluency.',
  keywords: ['Polish', 'language learning', 'Duolingo alternative', 'learn Polish', 'Polish lessons'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
