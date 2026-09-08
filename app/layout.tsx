import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AssessmentProvider } from '@/context/AssessmentContext';
import LanguageToggle from '@/components/LanguageToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Student Oral Assessment App',
  description: 'Browser-based student oral assessment recording application with grade-level prompt selection and state machine controls.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white`} suppressHydrationWarning>
        <AssessmentProvider>
          <LanguageToggle />
          {children}
        </AssessmentProvider>
      </body>
    </html>
  );
}
