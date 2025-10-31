import { Button } from "./components/ui/button";

const userName = "Davi Fernandes";

const App = () => {
  return (
    <div>
      <h2 className="text-primary-green text-3xl">{userName}</h2>
      <Button onClick={() => alert("Hello World")}>Clique Aqui</Button>
    </div>
  );
};

export default App;
