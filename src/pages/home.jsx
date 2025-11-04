import { Loader2Icon, PlusIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

import DateSelection from "@/components/date-selection";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";

const Home = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-2">
        <h2>Carregando</h2>
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
            <Button>
              Nova transação <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
