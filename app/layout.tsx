import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js 블로그",
  description: "Next.js App Router를 사용한 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="bg-blue-500 text-white p-4">
          <nav className="container mx-auto">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:underline">
                  포스트
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  소개
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© 2024 Next.js 블로그</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
