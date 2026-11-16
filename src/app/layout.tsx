import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/shared/config/site";
import "./globals.css";
import { Header } from "@/shared/layout/header";
import { Footer } from "@/shared/layout/footer";
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});
export const metadata: Metadata = {
  title: { default: site.name, template: "%s | " + site.name },
  description: site.description,
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
