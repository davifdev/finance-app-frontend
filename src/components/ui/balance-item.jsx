import { Card, CardContent } from "./card";

const BalanceItem = ({ icon, amount, text }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
              {icon}
            </div>
            <span className="text-muted-foreground text-sm">{text}</span>
          </div>
          <p className="text-2xl font-semibold">R$ {amount}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceItem;
