import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import BalanceItem from "./ui/balance-item";

const Balance = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        text="Saldo"
        amount="2.700,00"
        icon={<WalletIcon size={16} />}
      />
      <BalanceItem
        text="Ganhos"
        amount="5.700,00"
        icon={<TrendingUpIcon size={16} className="text-primary-green" />}
      />
      <BalanceItem
        text="Gastos"
        amount="3.000,00"
        icon={<TrendingDownIcon size={16} className="text-primary-red" />}
      />
      <BalanceItem
        text="Investimento"
        amount="0"
        icon={<PiggyBankIcon size={16} className="text-primary-blue" />}
      />
    </div>
  );
};

export default Balance;
