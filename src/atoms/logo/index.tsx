
import {ChartNoAxesColumnIncreasing, ChartNoAxesColumnDecreasing} from "lucide-react";
import { HEADER_DATA } from "@/utils/headerData";

const Logo = () => {
    return  ( <h1 className="text-2xl font-bold flex items-center hover:cursor-pointer">
    <ChartNoAxesColumnIncreasing className="ml-2 text"/>
    {HEADER_DATA[0]}
      <ChartNoAxesColumnDecreasing className="mr-2" />
  </h1>)
}

export default Logo