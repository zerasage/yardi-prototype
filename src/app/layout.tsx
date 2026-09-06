import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = {
  title: "Yardi — every yard, verified",
  description:
    "A fabric marketplace for Nigeria. Buy and sell ankara, lace, aso-oke, adire and shadda by the yard, with escrow and verified quality. Prototype by ZeraSage Technologies.",
};

export const viewport: Viewport = {
  themeColor: "#1B2A6B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        style={
          {
            "--font-display": "'Bricolage Grotesque'",
            "--font-sans": "'Inter'",
          } as React.CSSProperties
        }
      >
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
