import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Client Management System',
    description: 'Dashboard for managing clients and leads',
};

import styles from './Layout.module.scss';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} ${styles.body}`}>
                <Sidebar />
                <div className={styles.mainWrapper}>
                    <Header />
                    <main className={styles.mainContent}>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
