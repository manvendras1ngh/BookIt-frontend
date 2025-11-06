import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <section>
      <Navbar />

      <section className="p-4">
        <Outlet />
      </section>
      <Toaster />
    </section>
  );
};

export default Layout;
