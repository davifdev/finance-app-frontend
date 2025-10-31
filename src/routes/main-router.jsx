import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Signin from "@/pages/signin-page";
import SignUp from "@/pages/signup-page";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
