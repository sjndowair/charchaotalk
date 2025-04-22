import Link from "next/link";

export default function Header() {
  return (
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
  );
}
