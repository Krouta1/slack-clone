import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Lato } from 'next/font/google';
import { cn } from '@/lib/utils';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Slackzz',
  description: 'Slack clone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          lato.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
