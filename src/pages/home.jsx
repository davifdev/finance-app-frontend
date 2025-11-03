import { Loader2Icon } from "lucide-react";
import { Navigate } from "react-router-dom";

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
    <h2 className="text-3xl font-semibold">
      Seja bem-vindo {user?.name} {user?.lastname}
    </h2>
  );
};

export default Home;
