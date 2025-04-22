import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Next.js 블로그에 오신 것을 환영합니다
      </h1>
      <p className="text-lg">
        Next.js의 App Router를 사용하여 만든 간단한 블로그입니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/posts"
          className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">포스트 보기</h2>
          <p>블로그의 모든 포스트를 확인해보세요.</p>
        </Link>
        <Link
          href="/about"
          className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">소개</h2>
          <p>이 블로그에 대해 알아보세요.</p>
        </Link>
      </div>
    </div>
  );
}
