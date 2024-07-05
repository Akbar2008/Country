import { useState } from "react";
import "./default.css";
import { Link } from "react-router-dom";
const Default = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setTimeout(() => {
      setIsActive(true);
    }, 3000);
  };
  handleClick();
  return (
    <div className="default_page">
      <div className="isActive">
        <h1 className="isActive_h1">404</h1>
        <h1 className="isActive_h1">PAGE NOT FOUND</h1>
      </div>
      <Link to="/">
        <button className={isActive ? "btnActive" : "show"}>
          <i className="ri-arrow-left-line"></i> Return to home page
        </button>
      </Link>
    </div>
  );
};

export default Default;
