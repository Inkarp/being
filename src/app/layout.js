// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollToTop from "./ScrollToTop";
import Header from "./Home/Header";
import Footer from "./Home/Footer";
import ShareButton from "./ShareButton";
import ChatModal from "./Home/ChatModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Being Instruments",
    template: "",
  },
  description: "Scientific & Analytical Instrument Solutions",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* <head>
     
        <Script
          id="collect-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d) {
                w.CollectId = "672db8abf4bc76248fc52c81";
                w.CollectAutoOpen = false;
                const h = d.head || d.getElementsByTagName("head")[0];
                const s = d.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://collectcdn.com/launcher.js";
                h.appendChild(s);
              })(window, document);
            `,
          }}
        />
      </head> */}

      <body className="bg-white">
        <ScrollToTop />
        <Header />
        <ShareButton />

        <main className="w-[90%] mx-auto pt-20">
          {children}
        </main>
        <ChatModal />
        <Footer />
      </body>
    </html>
  );
}
