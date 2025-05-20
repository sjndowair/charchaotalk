const API_URL  = process.env.NEXT_PUBLIC_API_UR || "";

export const getUpbitApiData = async () => {
    
    const res = await fetch(`${API_URL}/v1/market/all`)
    try{
        const data = await res.json();
        if(!res.ok){
            throw new Error(`데이터 패칭이 실패하였습니다, ${res.statusText}`)
        }
        return data;
    }catch(err){
        throw new Error(`에러가 발생 하였습니다, ${err}`)
        
    }


}