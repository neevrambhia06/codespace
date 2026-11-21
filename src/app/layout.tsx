import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/Toaster";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const fontEditorial = Fraunces({
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: `${APP_NAME} — The Sovereign Developer Workspace`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ["developer", "workspace", "code", "IDE", "productivity", "editorial"],
  authors: [{ name: "CodeSpace Team" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${APP_NAME} — The Sovereign Developer Workspace`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(APP_NAME)}&description=${encodeURIComponent(APP_DESCRIPTION)}`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Open Graph Image`,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`/api/og?title=${encodeURIComponent(APP_NAME)}&description=${encodeURIComponent(APP_DESCRIPTION)}`],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontEditorial.variable} ${fontSans.variable} ${fontMono.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans selection:bg-[#D5360C] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ScrollToTop />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
