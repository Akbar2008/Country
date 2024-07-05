import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header"

export const Leaut = () => {
    return (
      <>
        <Header />
        <Outlet/>
      </>
    );
}