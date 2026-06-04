import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CMS para Restaurant",
  description: "CMS para gestión de resto y menú",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: defaultUrl,
    languages: {
      "es-AR": `${defaultUrl}`,
    },
  },
  openGraph: {
    title: "Genere su propia cartilla o menú digital",
    description:
      "Arme su propia carta de menú digital y comparta el código QR para el cliente",
    siteName: defaultUrl,
    images: [
      {
        url: "https://turesto.edelbyte.com.ar/turesto.webp",
        width: 1200,
        height: 630,
        alt: "Imagen de la app web turestó",
      },
    ],
    locale: "es-AR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="background foreground-ligth">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
