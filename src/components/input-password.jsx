import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InputPassword = ({ placeholder, ...props }) => {
  const [passwordIsVisible, setPasswordIsVisivle] = useState(false);
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-7 w-7 cursor-pointer"
        onClick={() => setPasswordIsVisivle(!passwordIsVisible)}
      >
        {passwordIsVisible ? <EyeOff /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default InputPassword;
