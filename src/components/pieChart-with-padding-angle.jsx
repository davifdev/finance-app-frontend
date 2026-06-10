import { RechartsDevtools } from "@recharts/devtools";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Pie, PieChart } from "recharts";

import { useGetBalance } from "@/api/hooks/user";

export default function PieChartWithPaddingAngle({ isAnimationActive = true }) {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { data: balance } = useGetBalance({ from, to });

  const data = [
    {
      name: "Group A",
      value: Number(balance?.investmentPercentage),
      fill: "#3b85fc",
    },
    {
      name: "Group B",
      value: Number(balance?.earningsPercentage),
      fill: "#56b22e",
    },
    {
      name: "Group C",
      value: Number(balance?.expensesPercentage),
      fill: "#e92f2f",
    },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-0 lg:flex-row lg:p-4 xl:gap-8">
      <PieChart
        style={{
          width: "100%",
          maxWidth: "170px",
          maxHeight: "170px",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data}
          innerRadius="80%"
          outerRadius="100%"
          cornerRadius="50%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          isAnimationActive={isAnimationActive}
        />
        <RechartsDevtools />
      </PieChart>
      <div className="flex w-[188px] flex-col items-start gap-2 p-2 md:p-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
              <TrendingUpIcon size={16} className="text-primary-green" />
            </div>
            <p className="text-muted-foreground text-sm">Ganhos</p>
          </div>
          <p className="text-sm text-white">{balance?.earningsPercentage}%</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
              <TrendingDownIcon size={16} className="text-primary-red" />
            </div>
            <p className="text-muted-foreground text-sm">Gastos</p>
          </div>
          <p className="text-sm text-white">{balance?.expensesPercentage}%</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
                <PiggyBankIcon size={16} className="text-primary-blue" />
              </div>
              <p className="text-muted-foreground text-sm">Investimentos</p>
            </div>
          </div>
          <p className="text-sm text-white">{balance?.investmentPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
