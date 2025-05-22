
import {ChartNoAxesColumnIncreasing, ChartNoAxesColumnDecreasing} from "lucide-react";
import { HEADER_DATA } from "@/utils/headerData";

const Logo = () => {
    return  ( <h1 className="text-2xl font-bold flex items-center hover:cursor-pointer m-0">
    <ChartNoAxesColumnIncreasing />
    {HEADER_DATA[0]}
      <ChartNoAxesColumnDecreasing  />
  </h1>)
}

export default Logo