import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";

import { useGetTransactions } from "@/api/hooks/transaction";
import { formatCurrency } from "@/helpers/formatCurrency";

import DeleteTransactionButton from "./delete-transaction-button";
import EditTransactionButton from "./edit-transaction-button";
import TransactionTypeBadge from "./transaction-type-badge";
import { DataTable } from "./ui/data-table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export const columns = [
  {
    accessorKey: "name",
    header: "Título",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return (
        <span className="text-muted-foreground">
          {format(new Date(transaction.date), "dd 'de' LLLL 'de' yyyy", {
            locale: ptBR,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      console.log(transaction.id);
      return (
        <div className="flex items-center">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];

const TransactionsTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data: transactions } = useGetTransactions({ from, to });
  if (!transactions) return null;

  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-[370px] max-h-[370px] rounded-md border">
        <DataTable columns={columns} data={transactions} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default TransactionsTable;
