import { useSearchParams } from "react-router-dom";

import { useGetTransactions } from "@/api/hooks/transaction";

import { DataTable } from "./ui/data-table";
import { ScrollArea } from "./ui/scroll-area";

export const columns = [
  {
    accessorKey: "name",
    header: "Título",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
    header: "Ações",
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
      </ScrollArea>
    </>
  );
};

export default TransactionsTable;
