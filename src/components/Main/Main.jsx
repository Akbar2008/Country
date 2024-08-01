import "./main.css";
import { useContext, useEffect, useRef } from "react";
import Search from "../../../public/icon/search.svg";
import SearchTh from "../../../public/icon/searchtheme.svg";
import Down from "../../../public/icon/down.svg";
import WithDown from "../../../public/icon/withDown.svg";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CardSkleton } from "../CardSkeleton";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import PropTypes from "prop-types";
export const Main = () => {
  const { isDark } = useContext(Context);
  const [addInfo, setaddInfo] = useState(8);
  const [count, setCount] = useState(false);
  const [isText, setText] = useState("Filter by Region");
  const [inpValue, outValue] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState("all");
  useEffect(() => {
    fetch(
      `https://restcountries.com/v3.1/${
        region === "all" ? "all" : "region/" + region
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        setTodoData(
          inpValue.trim().length > 0
            ? json.filter((item) =>
                item.name.common
                  .toLowerCase()
                  .includes(inpValue.trim().toLowerCase())
              )
            : json
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inpValue || isText]);
  const BtnRef = useRef();
  useEffect(() => {
    BtnRef.current.style.display = "none";
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        BtnRef.current.style.display = "block";
      } else {
        BtnRef.current.style.display = "none";
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    BtnRef.current.addEventListener("click", topFunction);
  }, []);
  const optionsText = [
    { id: 1, title: "all" },
    { id: 2, title: "Africa" },
    { id: 3, title: "America" },
    { id: 4, title: "Asia" },
    { id: 5, title: "Europe" },
    { id: 6, title: "Oceania" },
  ];
  return (
    <main>
      <div className="main_search">
        <form
          className={
            (isDark ? "containerWhite" : "") 
          }
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {!isDark ? (
            <Search className="search" />
          ) : (
            <SearchTh className="search" />
          )}
          <input
            type="text"
            placeholder="Search for a country…"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[0-9]/g, "");
              outValue(e.target.value);
            }}
          />
        </form>
        <div className="select">
          <div
            className={!isDark ? "option" : "option containerWhite"}
            onClick={() => {
              setCount(count ? false : true);
            }}
          >
            {isText}{" "}
            {isDark ? (
              <WithDown className={!count ? "down" : ""} />
            ) : (
              <Down className={!count ? "down" : ""} />
            )}
          </div>
          <div
            className={!count ? "show" : "option_abs "}
            id={!isDark ? "" : "containerWhite"}
          >
            {optionsText.map((item) => {
              const { id, title } = item;
              return (
                <p
                  className={isDark ? "textColor" : ""}
                  key={id}
                  onClick={() => {
                    setText(title), setRegion(title);
                  }}
                >
                  {" "}
                  {title == "all" ? "All" : title}{" "}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className={addInfo == 1 ? "main_flagsOne" : "main_flags"}>
        {isLoading && <CardSkleton cards={addInfo} />}
        {todoData.length > 0 ? (
          todoData.map((item, index) => {
            if (index < addInfo) {
              const {
                name,
                region,
                flags: { png },
                population,
                capital,
              } = item;
              return (
                <Link to={`/country/${name.common}`} key={index}>
                  <div className={!isDark ? "card" : "card containerWhite"}>
                    <img src={png} alt={region + " not found"} />
                    <div className="flags_info">
                      <h3>{name.common || "common not found"}</h3>
                      <div className="info_list">
                        <p>
                          Population:
                          <span>
                            {" "}
                            {population.toLocaleString() ||
                              "population not found"}
                          </span>
                        </p>
                        <p>
                          Region:
                          <span>{region || "region  not found"}</span>
                        </p>
                        <p>
                          Capital:
                          <span>{capital || "capital not found"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })
        ) : (
          <p className={isDark ? "textColor fontP" : "fontP"}>
            Nothing to see...
          </p>
        )}
      </div>
      {/* <img src="/img/smile.png" alt="smile" /> */}
      <button
        className={
          (addInfo > todoData.length || inpValue.length > 0
            ? "show "
            : "addBtn")||( isDark ? "addBtn black" : "addBtn")
        }
        style={isDark ? {color: '#000', border: '1px solid black'} : {}}
        onClick={() => {
          setaddInfo((addInfo) => addInfo + 4);
        }}
      >
        Add information
      </button>
      <button ref={BtnRef} className="scroll_top show">
        <img
          src="https://cdn-icons-png.flaticon.com/512/10024/10024409.png"
          alt=""
        />
      </button>
    </main>
  );
};
Main.propTypes = {
  isDark: PropTypes.bool,
  setDark: PropTypes.func,
};
