// app/layout.js
import Script from "next/script";
import { Geist, Geist_Mono, Raleway, DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./ScrollToTop";
import Header from "./Home/Header";
import Footer from "./Home/Footer";
import ShareButton from "./ShareButton";
import ChatModal from "./Home/ChatModal";
import { ProductProvider } from "./context/ProductContext";

import ProductsSidebar from "./ProductsSidebar";
import SocialContactBar from "./SocialContactBar";
import FestivalUpdates from "./FestivalUpdates";
import LastViewedProduct from "./LastViewedProduct";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  // subsets: ["latin"],
  weight: ["800"],
  variable: "--font-raleway",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Being Instruments India | Laboratory Equipment Supplier | Hyderabad ",
    template: "",
  },
  description: "Being Instruments India — authorised distributor of BEING laboratory equipment. CO₂ incubators, vacuum ovens, ULT freezers, BSCs, rotary evaporators & more. 10+ years · 5,000+ instruments · Hyderabad. Enquire today. ",
  keywords: [
    "Being Instruments India",
    "Being laboratory equipment",
    "laboratory equipment supplier in Hyderabad",
    "laboratory instruments Hyderabad",
    "scientific instruments India",
    "analytical instruments India",
    "CO2 incubator supplier",
    "vacuum oven supplier",
    "ULT freezer supplier",
    "biosafety cabinet supplier",
    "rotary evaporator supplier",
    "laboratory equipment distributor India",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {/* // className={`${montserrat.variable}`} */}
      <head>
        <link rel="preload" href="/favicon.png" as="image" />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-578HZWGC');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body className="bg-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-578HZWGC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ScrollToTop />
        <Header />
        {/* <ShareButton /> */}
        {/* <SocialContactBar /> */}
        {/* <FestivalUpdates /> */}
        {/* <ProductsSidebar /> */}

        <ProductProvider>
          <main
          // className="w-[95%] mx-auto"
          >
            {children}
          </main>
        </ProductProvider>

        <ChatModal />
        <Footer />
        <LastViewedProduct />
      </body>
    </html>
  );
}
