import { createContext, useContext, useEffect, useState } from "react";
import Default from "./components/DefaoltPage/Default";
import { Main } from "./components/Main/Main";
import "./style/app.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router-dom";
import { Leaut } from "./components/Leaut";
import { CountryInfo } from "./components/countryInformation/CountryInfo";
import { SkeletonTheme } from "react-loading-skeleton";
export const Context = createContext(null);
export function App() {
  const [isDark, setDark] = useState(
    false || JSON.parse(localStorage.getItem("dark"))
  );
  useEffect(() => {
    if (isDark) {
      document.body.style.background = "#fff";
    } else {
      document.body.style.background = "#202c36";
    }
  }, [isDark]);
   localStorage.setItem("dark", isDark);
  return (
    <Context.Provider value={{ isDark, setDark }}>
      <SkeletonTheme baseColor="#8f8d8d" highlightColor="#8f8d8d">
        <div className="container">
          <Routes>
            <Route path="/" element={<Leaut />}>
              <Route index element={<Main />} />
              <Route path="country/:name" element={<CountryInfo />} />
            </Route>
            <Route path="*" element={<Default />} />
          </Routes>
        </div>
      </SkeletonTheme>
    </Context.Provider>
  );
}
