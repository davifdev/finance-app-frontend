import { cva } from "class-variance-authority";
import { CircleIcon } from "lucide-react";

const badgeVariants = cva(
  " bg-muted flex h-[21px] w-fit items-center gap-1.5 rounded-full px-2 text-xs font-bold",
  {
    variants: {
      variant: {
        earning: "text-primary-green fill-primary-green",
        expense: "text-primary-red fill-primary-red",
        investment: "text-primary-blue fill-primary-blue",
      },
    },
    defaultVariants: {
      variant: "earning",
    },
  }
);

const getText = (variant) => {
  switch (variant) {
    case "earning":
      return "Ganho";
    case "expense":
      return "Gasto";
    case "investment":
      return "Investimento";
    default:
      "";
      return "";
  }
};

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={badgeVariants({ variant })}>
      <CircleIcon fill="fill-inherit" size={10} />
      {getText(variant)}
    </div>
  );
};

export default TransactionTypeBadge;
