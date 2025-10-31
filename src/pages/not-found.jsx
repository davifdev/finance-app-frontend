import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <p>Ops :/ Página não encontrada</p>
      <h2 className="text-3xl">Error 404</h2>
      <Button variant="secondary" asChild>
        <Link to="/">Retomar naveção</Link>
      </Button>
    </div>
  );
};

export default NotFound;
