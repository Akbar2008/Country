import "./header.css";
import DarkMoon from "../../../public/icon/moon.svg";
import LightMoon from "../../../public/icon/moon_mode.svg";
import { Context } from "../../App";
import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const Header = () => {
  const { isDark, setDark } = useContext(Context);
  console.log(isDark);
  return (
    <header className={isDark ? "header_mode-theme" : ""}>
      <Link to="/">
        <img
          src={
            !isDark
              ? "../img/Where in the world_.png"
              : "../img/Where in the world_Dark.png"
          }
          alt=""
        />
      </Link>
      <div
        className="header_mode"
        onClick={() => {
          setDark(isDark ? false : true);
        }}
      >
        {!isDark ? <DarkMoon className="DarkMoon" /> : <LightMoon />}
        <p>Dark Mode</p>
      </div>
    </header>
  );
};

Header.propTypes = {
  isDark: PropTypes.bool,
  setDark: PropTypes.func,
}