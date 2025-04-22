import { notFound } from "next/navigation";
import Link from "next/link";

// 임시 데이터
const posts = [
  {
    id: 1,
    title: "Next.js 시작하기",
    description: "Next.js의 기본 개념과 사용법을 알아봅니다.",
    date: "2024-03-20",
    content: "Next.js는 React 기반의 프레임워크로...",
  },
  {
    id: 2,
    title: "App Router 사용법",
    description: "Next.js의 새로운 App Router를 사용하는 방법을 배워봅니다.",
    date: "2024-03-21",
    content: "App Router는 Next.js 13부터 도입된...",
  },
  {
    id: 3,
    title: "서버 컴포넌트",
    description: "서버 컴포넌트의 장점과 사용법을 알아봅니다.",
    date: "2024-03-22",
    content: "서버 컴포넌트는 서버에서 렌더링되는...",
  },
];

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === Number(params.id));
  console.log(post);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/posts" className="text-blue-500 hover:underline">
        ← 목록으로 돌아가기
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">{post.date}</p>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}
