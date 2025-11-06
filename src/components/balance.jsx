import { useQuery } from "@tanstack/react-query";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { useAuthContext } from "@/contexts/auth";
import { UserService } from "@/services/user";

import BalanceItem from "./ui/balance-item";

const Balance = () => {
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { data } = useQuery({
    queryKey: ["getBalance", from, to, user],
    queryFn: async () => {
      const response = await UserService.getBalance({ from, to });
      return response;
    },
  });

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        text="Saldo"
        amount={data?.balance}
        icon={<WalletIcon size={16} />}
      />
      <BalanceItem
        text="Ganhos"
        amount={data?.earnings}
        icon={<TrendingUpIcon size={16} className="text-primary-green" />}
      />
      <BalanceItem
        text="Gastos"
        amount={data?.expenses}
        icon={<TrendingDownIcon size={16} className="text-primary-red" />}
      />
      <BalanceItem
        text="Investimento"
        amount={data?.investments}
        icon={<PiggyBankIcon size={16} className="text-primary-blue" />}
      />
    </div>
  );
};

export default Balance;
