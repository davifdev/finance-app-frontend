import { Loader2Icon } from "lucide-react";
import { Navigate } from "react-router-dom";

import AddTransactionButton from "@/components/add-transaction-button.";
import Balance from "@/components/balance";
import DateSelection from "@/components/date-selection";
import Header from "@/components/header";
import TransactionsTable from "@/components/transactions-table";
import { Card } from "@/components/ui/card";
import { useAuthContext } from "@/contexts/auth";

const Home = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-2">
        <h2>Carregando...</h2>
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Header />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <Balance />
          <Card></Card>
        </div>
        <TransactionsTable />
      </div>
    </>
  );
};

export default Home;
