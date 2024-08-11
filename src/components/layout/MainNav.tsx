import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MainNavLinks from "./MainNavLinks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const MainNav = () => {
  const userData = useSelector((state: RootState) => state.authData);
  const navigate = useNavigate()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {userData.userToken ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-black" />
              {userData.userData.email}
            </span>
          ) : (
            <span> Welcome to Antika.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {userData.userToken ? (
            <MainNavLinks />
          ) : (
            <div className="flex gap-4">

            <Button
              onClick={() => navigate("/sign-up")}
              className="flex-1 font-bold bg-black"
            >
              Sign up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="flex-1 font-bold bg-black"
            >
              Log In
            </Button>
            </div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MainNav;