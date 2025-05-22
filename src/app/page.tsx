import MarketInfo from "@/components/marketInfo";
import ChartInfo from "@/components/chartInfo";


export default function Home() {
   

  return (
    <div className='flex'>
     
     <MarketInfo />
     <ChartInfo />
    </div>
  );
}