import { Link } from "react-router-dom";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="border-b-2 border-b-black py-6 bg-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-white"
        >
          Antika.com
        </Link>
        <div>
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;