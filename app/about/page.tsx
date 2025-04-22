export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">소개</h1>
      <div className="prose max-w-none">
        <p>
          이 블로그는 Next.js의 App Router를 사용하여 만들어진 간단한
          블로그입니다. App Router의 다양한 기능을 보여주기 위해 만들어졌습니다.
        </p>
        <h2 className="text-2xl font-semibold mt-8">주요 기능</h2>
        <ul className="list-disc pl-6">
          <li>App Router를 사용한 라우팅</li>
          <li>서버 컴포넌트</li>
          <li>동적 라우팅</li>
          <li>레이아웃</li>
        </ul>
      </div>
    </div>
  );
}
