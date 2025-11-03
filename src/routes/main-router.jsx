import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "@/contexts/auth";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Signin from "@/pages/signin-page";
import SignUp from "@/pages/signup-page";

const queryClient = new QueryClient();

const MainRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default MainRouter;
