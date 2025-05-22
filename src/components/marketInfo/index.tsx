


const MarketInfo = async () => {
    const res = await fetch('https://api.upbit.com/v1/market/all?isDetails=true');
    if(!res.ok) {
        throw new Error(res.statusText)
    }
    try{
        const data = await res.json();
        console.log(data)
    }catch(err){
        console.log(err)
    }

    return (<div>임시 마켓 인포 영역</div>)
}

export default MarketInfo