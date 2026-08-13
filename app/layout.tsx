import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlobalSearchModal } from '@/components/layout/GlobalSearchModal';
import { CivicChatbotModal } from '@/components/ai/CivicChatbotModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JanVaani — India\'s Citizen Problem & Solution Intelligence Platform',
  description:
    'Speak. Share. Solve. Reward. JanVaani allows citizens to report real-world problems in their own language, validate with evidence, discover solutions, and collaborate with authorities.',
  keywords: [
    'JanVaani',
    'Civic Tech India',
    'Citizen Grievances',
    'Municipal Intelligence',
    'Smart Cities India',
    'Problem Reporting',
    'Civic Solutions',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white font-sans bg-slate-50 text-slate-900">
        <AppProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <GlobalSearchModal />
          <CivicChatbotModal />
        </AppProvider>
      </body>
    </html>
  );
}
