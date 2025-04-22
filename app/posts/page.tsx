import Link from "next/link";

// 임시 데이터
const posts = [
  {
    id: 1,
    title: "Next.js 시작하기",
    description: "Next.js의 기본 개념과 사용법을 알아봅니다.",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "App Router 사용법",
    description: "Next.js의 새로운 App Router를 사용하는 방법을 배워봅니다.",
    date: "2024-03-21",
  },
  {
    id: 3,
    title: "서버 컴포넌트",
    description: "서버 컴포넌트의 장점과 사용법을 알아봅니다.",
    date: "2024-03-22",
  },
];

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">포스트 목록</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
