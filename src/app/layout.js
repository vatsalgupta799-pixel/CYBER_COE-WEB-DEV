import { Roboto, League_Spartan } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const leagueSpartan = League_Spartan({
  weight: ['700', '900'], // Bold and Black
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-league-spartan',
});

export const metadata = {
  title: 'Centre for Cybersecurity',
  description:
    'Pioneering research and innovation in cybersecurity. Explore our projects, people, and events.',
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${roboto.variable} ${leagueSpartan.variable} ${roboto.className}`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" forcedTheme="dark">
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
