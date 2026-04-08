import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevToolkit - Premium Multi-Tool Suite for Developers',
  description:
    'All-in-one developer toolkit with JWT decoder, Base64 encoder, cron expression parser, regex tester, hash generator, UUID generator, timestamp converter, color converter, diff checker, markdown preview, and more. 100% client-side, no data transmission.',
  keywords: [
    'developer tools',
    'JWT decoder',
    'Base64 encoder',
    'cron expression parser',
    'regex tester',
    'hash generator',
    'UUID generator',
    'timestamp converter',
    'color converter',
    'diff checker',
    'markdown preview',
    'online tools',
    'web utilities',
    'developer utilities',
  ],
  authors: [{ name: 'DevToolkit' }],
  creator: 'DevToolkit',
  publisher: 'DevToolkit',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    url: 'https://devtoolskitapp.vercel.app',
    title: 'DevToolkit - Premium Multi-Tool Suite for Developers',
    description:
      'All-in-one developer toolkit with 12+ essential tools. 100% client-side processing.',
    siteName: 'DevToolkit',
    images: [
      {
        url: 'https://devtoolskitapp.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevToolkit - Developer Multi-Tool Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolkit - Premium Multi-Tool Suite for Developers',
    description:
      'All-in-one developer toolkit with 12+ essential tools. 100% client-side processing.',
    creator: '@devtoolkit',
    images: ['https://devtoolskitapp.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://devtoolskitapp.vercel.app',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4N56LRGCZ5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4N56LRGCZ5', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'DevToolkit',
              url: 'https://devtoolskitapp.vercel.app',
              description:
                'Premium multi-tool suite for developers with 12+ essential tools for everyday development tasks.',
              applicationCategory: 'DeveloperApplication',
              softwareVersion: '1.0.0',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'DevToolkit',
                url: 'https://devtoolskitapp.vercel.app',
              },
            }),
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
