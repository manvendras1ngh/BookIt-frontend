import { useState } from "react";
import logo from "../assets/HDlogo 1.png";
import useExperienceContext from "../contexts/useExperienceContext";

const Navbar = () => {
  const { filterByName } = useExperienceContext();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    filterByName(search);
  };

  return (
    <nav className="flex justify-between items-center px-8 py-3 shadow-xl">
      <img src={logo} alt="logo" />

      <div className="space-x-3">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search experiences"
          className="bg-[#EDEDED] p-3 w-[300px] rounded-md text-xs font-light focus:outline-none"
        />
        <button
          className="bg-[#FFD643] py-3 px-5 text-xs rounded-md cursor-pointer hover:bg-yellow-400"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
