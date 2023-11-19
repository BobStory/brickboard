import '@/app/shared/globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next';
import SessionProvider from './shared/session/session_provider';

export const metadata: Metadata = {
    title: 'Brickboard - Redirecting to /home'
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession();

    return (
        <html lang="en">
            <body>
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}