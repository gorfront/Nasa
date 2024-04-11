import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";
import Language from "../components/Language/Language";

const Wrapper: React.FC = () => {
  return (
    <>
      <Head />
      <Language />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Wrapper;
