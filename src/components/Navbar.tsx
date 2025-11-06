import logo from "../assets/HDlogo 1.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 shadow-xl">
      <img src={logo} alt="logo" />

      <div className="space-x-3">
        <input
          type="text"
          placeholder="Search experiences"
          className="bg-[#EDEDED] p-3 w-[300px] rounded-md text-xs font-light"
        />
        <button className="bg-[#FFD643] py-3 px-5 text-xs rounded-md">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
