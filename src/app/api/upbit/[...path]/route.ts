import { NextResponse } from 'next/server'; // App Router에서 응답을 위해 사용
import jwt from 'jsonwebtoken'; // npm install jsonwebtoken
import { v4 as uuidv4 } from 'uuid'; // npm install uuid @types/uuid
import * as crypto from 'crypto'; // Node.js 내장 모듈 (해싱용)
import * as querystring from 'querystring'; // Node.js 내장 모듈 (쿼리 스트링 처리용)

// 🚨 중요: 환경 변수는 .env.local 파일 또는 배포 플랫폼에 설정해야 합니다.
// 예시:
// UPBIT_ACCESS_KEY="YOUR_UPBIT_ACCESS_KEY"
// UPBIT_SECRET_KEY="YOUR_UPBIT_SECRET_KEY"
const UPBIT_ACCESS_KEY = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
const UPBIT_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

const UPBIT_API_BASE_URL = 'https://api.upbit.com/v1';

/**
 * JWT(JSON Web Token)를 생성하는 헬퍼 함수
 * @param params API 요청에 포함될 파라미터 (GET 쿼리 또는 POST 바디)
 * @param isPostOrPut POST/PUT 요청인지 여부 (true면 json_hash 생성)
 * @returns 생성된 JWT 문자열
 */
const generateJwtToken = (params?: Record<string, any>, isPostOrPut: boolean = false): string => {
  if (!UPBIT_ACCESS_KEY || !UPBIT_SECRET_KEY) {
    throw new Error('Upbit API keys are not configured.');
  }

  //키값이 맞지 않으면 에러 선언해주는 코드

  const payload: any = {
    access_key: UPBIT_ACCESS_KEY,
    nonce: uuidv4(), // 매 요청마다 고유한 값
  };

  if (params && Object.keys(params).length > 0) {
    const stringifiedParams = isPostOrPut
      ? JSON.stringify(params) // POST/PUT은 JSON 바디를 stringify
      : querystring.stringify(params); // GET은 쿼리 파라미터를 stringify

    const hash = crypto.createHash('sha512').update(Buffer.from(stringifiedParams)).digest('hex');

    if (isPostOrPut) {
      payload.json_hash = hash;
      payload.json_hash_alg = 'SHA512';
    } else {
      payload.query_hash = hash;
      payload.query_hash_alg = 'SHA512';
    }
  }

  return jwt.sign(payload, UPBIT_SECRET_KEY, { algorithm: 'HS256' });
};

/**
 * Next.js API Route GET 요청 핸들러
 * 클라이언트의 GET 요청을 받아서 업비트 GET API로 중계합니다.
 * 예: /api/upbit/market/all?isDetails=true
 */
export async function GET(
  request: Request, // 클라이언트의 Request 객체
  { params }: { params: { path: string[] } } // [...path] 라우팅 파라미터
) {
  try {
    // 1. 실제 업비트 API 엔드포인트 경로 추출 (예: 'market/all')
    const apiPath = params.path.join('/');
    console.log('API Path:', apiPath);

    // 2. 클라이언트가 보낸 쿼리 파라미터 추출
    const url = new URL(request.url);
    const actualQueryParams: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      actualQueryParams[key] = value;
    });
    console.log('Query Parameters:', actualQueryParams);

    // 환경 변수 확인 로그
    console.log('Access Key:', UPBIT_ACCESS_KEY ? '설정됨' : '설정되지 않음');
    console.log('Secret Key:', UPBIT_SECRET_KEY ? '설정됨' : '설정되지 않음');
    
    // 헤더 초기화
    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    // 3. 인증이 필요한 API인지 확인하고 JWT 토큰 생성
    const noAuthPaths = ['market/all']; // 인증이 필요 없는 API 경로들
    const requiresAuth = !noAuthPaths.includes(apiPath);
    
    if (requiresAuth) {
      if (!UPBIT_ACCESS_KEY || !UPBIT_SECRET_KEY) {
        console.error('API 키가 설정되지 않았지만 인증이 필요한 API를 호출하려고 합니다');
        return NextResponse.json(
          { error: 'Authentication required but API keys are not configured' },
          { status: 401 }
        );
      }
      
      try {
        const token = generateJwtToken(actualQueryParams, false);
        console.log('Token generated successfully');
        headers.Authorization = `Bearer ${token}`;
      } catch (tokenError: any) {
        console.error('Token generation error:', tokenError.message);
        return NextResponse.json(
          { error: 'Failed to generate authentication token', details: tokenError.message },
          { status: 500 }
        );
      }
    } else {
      console.log('인증이 필요 없는 API 경로입니다. 토큰 생성을 건너뜁니다.');
    }

    // 4. 업비트 API로 보낼 완전한 URL 구성
    const queryString = querystring.stringify(actualQueryParams);
    const targetUrl = `${UPBIT_API_BASE_URL}/${apiPath}${queryString ? `?${queryString}` : ''}`;
    console.log('Target URL:', targetUrl);

    // 6. 업비트 API에 요청 보내기
    console.log('Sending request to Upbit API...');
    const upbitResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: headers,
    });
    console.log('Response Status:', upbitResponse.status);
    console.log('Response Status Text:', upbitResponse.statusText);

    // 7. 업비트 응답 확인 및 전달
    if (!upbitResponse.ok) {
      console.error('Upbit API returned error status:', upbitResponse.status);
      try {
        const errorData = await upbitResponse.json();
        console.error('Upbit API Error Response:', errorData);
        return NextResponse.json(errorData, { status: upbitResponse.status });
      } catch (jsonError) {
        console.error('Failed to parse error response as JSON');
        const textResponse = await upbitResponse.text();
        console.error('Response text:', textResponse);
        return NextResponse.json(
          { error: 'Error from Upbit API', statusCode: upbitResponse.status, response: textResponse },
          { status: upbitResponse.status }
        );
      }
    }

    try {
      const data = await upbitResponse.json();
      console.log('Successfully received data from Upbit API');
      return NextResponse.json(data);
    } catch (jsonError: any) {
      console.error('Failed to parse success response as JSON', jsonError);
      const textResponse = await upbitResponse.text();
      console.error('Response text:', textResponse);
      return NextResponse.json(
        { error: 'Failed to parse Upbit API response', details: jsonError.message, response: textResponse },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in GET /api/upbit proxy:', error);
    return NextResponse.json(
      { error: 'Failed to process GET request for Upbit API', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Next.js API Route POST 요청 핸들러
 * 클라이언트의 POST 요청을 받아서 업비트 POST API로 중계합니다.
 * (예: 주문하기 API)
 */
// export async function POST(
//   request: Request, // 클라이언트의 Request 객체
//   { params }: { params: { path: string[] } } // [...path] 라우팅 파라미터
// ) {
//   try {
//     const apiPath = params.path.join('/');
//     const requestBody = await request.json(); // 클라이언트에서 보낸 JSON 바디 파싱

//     // JWT 토큰 생성 (POST 요청 바디를 해싱하여 포함)
//     const token = generateJwtToken(requestBody, true); // true는 POST 요청임을 의미

//     // 업비트 API로 보낼 헤더 설정
//     const headers: HeadersInit = {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json', // POST 요청은 JSON Content-Type 필요
//       Accept: 'application/json',
//     };

//     // 업비트 API에 요청 보내기
//     const upbitResponse = await fetch(`${UPBIT_API_BASE_URL}/${apiPath}`, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(requestBody), // 업비트 API로 보낼 JSON 바디
//     });

//     // 업비트 응답 확인 및 전달
//     if (!upbitResponse.ok) {
//       const errorData = await upbitResponse.json();
//       console.error('Upbit API Error Response (POST):', errorData);
//       return NextResponse.json(errorData, { status: upbitResponse.status });
//     }

//     const data = await upbitResponse.json();
//     return NextResponse.json(data);

//   } catch (error: any) {
//     console.error('Error in POST /api/upbit proxy:', error);
//     return NextResponse.json(
//       { error: 'Failed to process POST request for Upbit API', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // DELETE, PUT 등 다른 HTTP 메서드도 POST 함수와 유사하게 구현할 수 있습니다.
// // 요청 바디가 없다면 request.json() 부분을 제외하고,
// // JWT 생성 시 해당 메서드에 맞는 파라미터 해싱 규칙을 적용하면 됩니다.