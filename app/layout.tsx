// app/layout.tsx
import Footer from './components/footer';
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import FloatingChat from "./components/FloatingChat";

export const metadata: Metadata = {
  title: "Monitoria Digital",
  description: "Login no Monitoria Digital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <div className="flex flex-col flex-grow">
          <AuthProvider>
            <main className="flex-grow">
              {children}
            </main>
            <FloatingChat />
          </AuthProvider>
        </div>

        <Footer />

        <Script src="https://meet.jit.si/external_api.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
