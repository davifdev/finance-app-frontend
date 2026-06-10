import { formatCurrency } from "@/helpers/formatCurrency";

import { Card, CardContent } from "./card";

const BalanceItem = ({ icon, amount, text }) => {
  return (
    <Card className="py-2 md:py-7">
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
              {icon}
            </div>
            <span className="text-muted-foreground text-sm">{text}</span>
          </div>
          <p className="text-base font-semibold md:text-2xl">
            {formatCurrency(amount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceItem;
