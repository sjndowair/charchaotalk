"use client";
import { useState } from "react";
import {} from "lucide-react";


type TperiodType = "1D" | "1W" | "1M" | "6M" | "1Y"

export default function Home() {
  const [isOpenMarket, setIsOpenMarket] = useState({
    krw: false,
    btc: false,
    usdt: false,
    eth: false
  });

  const [chartType , setChartType] = useState<"line" | "bar" | "area">("line");
  const [period, setPeriod ] = useState<TperiodType>("1Y");
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");


  return (<div className="space-y-8"></div>);
}
