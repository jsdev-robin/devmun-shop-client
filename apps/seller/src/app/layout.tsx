import type { Metadata } from 'next';
import { Inter, Merriweather, Poppins, Roboto } from 'next/font/google';
import '@repo/ui/globals.css';
import { ThemeProvider } from '@repo/ui/contexts/theme-provider';
import { cn } from '@repo/ui/lib/utils';
import { Toaster } from '@repo/ui/components/sonner';
import Script from 'next/script';
import { AppProvider } from '../contexts/app-context';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Profiloo',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Robin Mind',
    'MERN Stack Developer',
    'JavaScript Developer',
    'React Developer',
    'Node.js Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Portfolio',
    'Devmun',
    'Bangladesh Developer',
  ],
  authors: [{ name: 'jsdev.robin@gmail.com', url: 'https://www.devmun.xyz' }],
  creator: 'Robin Mind',
  publisher: 'Robin Mind',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  title: 'Robin Mind – MERN Stack Developer | devmun.xyz',
  description:
    "Hi, I'm Robin Mind — a MERN Stack Developer passionate about building modern, responsive, and scalable web applications. Explore my work, tech stack, and services at devmun.xyz.",
  openGraph: {
    title: 'Robin Mind – Full Stack JavaScript Developer',
    description:
      'Discover the portfolio of Robin Mind, a full stack JavaScript developer specializing in the MERN stack. Browse projects, skills, and contact info at devmun.xyz.',
    url: 'https://www.devmun.xyz',
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', type: 'image/x-icon' },
      {
        url: '/images/favicon/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: [{ url: '/images/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://product-gallery.cloudinary.com/all.js"
          type="text/javascript"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={cn(
          'antialiased',
          inter.className,
          roboto.variable,
          poppins.variable,
          merriweather.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          // disableTransitionOnChange
        >
          <AppProvider>{children}</AppProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
