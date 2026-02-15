import './globals.css';
import { ThemeProvider } from 'next-themes';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ReduxProvider from '@/redux/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ReduxProvider>
          <ThemeProvider attribute={'class'}>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
