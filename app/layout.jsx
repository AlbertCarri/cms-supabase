import { GeistSans } from "geist/font/sans";
import "./globals.css";

// Metadatos para SEO de la pagina ya deployada
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CMS para Restaurant",
  description: "CMS para gestión de resto y menú",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans}>
      <body className="background foreground-ligth">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
