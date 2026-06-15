import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const APP_VERSION = "v.0.0.1";

export const metadata: Metadata = {
  title: "Calculadora de Horas Frío | Frutales",
  description:
    "Calcula Horas Frío acumuladas en frutales y determina el momento óptimo para aplicar cianamida.",
};

// Script anti-parpadeo: fija la clase .dark antes del primer paint.
const themeScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  if(t==='dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    document.documentElement.classList.add('dark');
  }
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Badge de versión — esquina superior izquierda */}
        <span className="fab glass left-4 top-4 rounded-full px-3 py-1 font-mono text-xs font-semibold text-emerald-800 ring-1 ring-white/40 dark:text-emerald-300">
          {APP_VERSION}
        </span>

        {children}

        {/* Toggle de tema — esquina inferior derecha */}
        <ThemeToggle />
      </body>
    </html>
  );
}
