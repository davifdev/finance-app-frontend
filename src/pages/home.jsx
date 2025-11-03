import { useAuthContext } from "@/contexts/auth";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <h2 className="text-3xl font-semibold">
      Seja bem-vindo {user?.name} {user?.lastname}
    </h2>
  );
};

export default Home;
