// app/some-page/client-component.tsx
'use client'; // 클라이언트 컴포넌트임을 명시

import React, { useEffect, useState } from 'react';

// 예시 인터페이스 (실제 업비트 API 응답에 맞춰 정의)
interface Market {
  market: string;
  korean_name: string;
  english_name: string;
}

export default function Home() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMarkets = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ 여러분의 Next.js API Route를 호출합니다.
        // URL의 경로와 쿼리 파라미터는 Next.js API Route에서 업비트로 전달됩니다.
        const response = await fetch('/api/upbit/market/all?isDetails=true');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP Error: ${response.status}`);
        }

        const data: Market[] = await response.json();
        setMarkets(data);
      } catch (err: any) {
        console.error('Failed to fetch markets:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMarkets();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

  if (loading) return <div>마켓 정보를 불러오는 중입니다...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div>
      <h2>업비트 거래 가능한 마켓</h2>
      <ul>
        {markets.map((market) => (
          <li key={market.market}>
            {market.korean_name} ({market.english_name})
          </li>
        ))}
      </ul>
    </div>
  );
}