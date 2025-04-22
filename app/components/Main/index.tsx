"use client";
import { useState } from "react";
import Link from "next/link";

const Main = () => {
  const [post, setPost] = useState(false);

  const onClick1 = () => {
    console.log("클릭됌");
    setPost(true);
    console.log("함수 끝");
  };

  return (
    <>
      {post && <div>이제부터 니이름은 춘식이여</div>}
      <h1
        onClick={() => {
          onClick1();
        }}
        className="text-4xl font-bold cursor-pointer hover:text-red-400"
      >
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
    </>
  );
};
export default Main;
