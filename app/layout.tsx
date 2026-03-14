import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language-provider'
import { Navbar } from '@/components/navbar'
import FloatingBackground from '@/components/ui/floating-background'
import PageTransition from '@/components/page-transition'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Farmtora',
  description: 'AI Assistant for Modern Farming',
  generator: 'v0.app',
  icons: {
    icon: '/farmtora_logo.png',
    apple: '/farmtora_logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SmoothScroll>
          <LanguageProvider>
            <FloatingBackground />
            <Navbar />
            <main className="relative z-10">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </LanguageProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
