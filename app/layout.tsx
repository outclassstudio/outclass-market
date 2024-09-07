import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Outclass Market",
    default: "Outclass Market",
  },
  description: "Enjoy out special market",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
