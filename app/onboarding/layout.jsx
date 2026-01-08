import "../globals.css";

export default function OnboardingLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen background foreground-ligth">
        <main className="w-full p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
