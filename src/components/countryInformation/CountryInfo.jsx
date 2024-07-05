import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./countryInfo.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
// import { LuMoveLeft } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import { InfoCardSkeleton} from "../InfoCardSkeleton";
export const CountryInfo = () => {
  const { pathname } = useLocation();
    const { isDark } = useContext(Context);
     const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name?.toLowerCase().trim()}`)
      .then((data) => data.json())
      .then((data) => {setData(data); setIsLoading(false)});
  }, [name]);
  return (
    <div className="countyInfo">
      <Link to="/">
        <button className={!isDark ? "countryInfo_btn" : "btn"}>
          <i className="ri-arrow-left-line"></i>
          Back
        </button>
      </Link>
      
      {isLoading ? <InfoCardSkeleton/> : data?.map((item, index) => {
        console.log(item);
        const {
          area,
          altSpellings,
          flags,
          borders,
          capital,
          name: { common, official },
          population,
          subregion,
          region,
          languages,
          tld,
          continents,
        } = item;
        if (index < 1) {
          return (
            <div className="info-list" key={area}>
              <img
                src={flags.png}
                alt={altSpellings["1"] + " img"}
                className="country_img"
              />
              <div
                className={
                  isDark
                    ? "list_country-select text_color"
                    : "list_country-select"
                }
              >
                <h1>{common || <Skeleton />}</h1>
                <div className="country_select-info">
                  <div className="info__font">
                    <p>
                      Native Name:
                      <span>{official || <Skeleton />}</span>
                    </p>
                    <p>
                      Population:
                      <span>{population || <Skeleton />}</span>
                    </p>
                    <p>
                      Region:
                      <span>{region || <Skeleton />}</span>
                    </p>
                    <p>
                      Sub Region:
                      <span>{subregion || <Skeleton />}</span>
                    </p>
                    <p>
                      Capital:
                      <span>{capital[0] || <Skeleton />}</span>
                    </p>
                  </div>
                  <div className="info__font">
                    <p>
                      Top Level Domain:
                      <span>{tld[0] || <Skeleton />}</span>
                    </p>
                    <p>
                      Currencies:
                      <span>{continents[0] || <Skeleton />}</span>
                    </p>
                    <p>
                      Languages:
                      <span>
                        {Object.values(languages).map((item, index, arr) => {
                          return (
                            <span key={index}>
                              {index < arr.length - 1
                                ? item + ", "
                                : item || <Skeleton />}{" "}
                            </span>
                          );
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="country_select-info__all">
                  <h3>Border Countries: </h3>
                  <div className="all_country">
                    {borders?.map((item, index) => {
                      return (
                        <button
                          className={isDark ? "btnWhite" : "AC_btn"}
                          key={index}
                          onClick={() => {
                            navigate(pathname == `country/${item}`);
                          }}
                        >
                          {item || <Skeleton />}
                        </button>
                      );
                    }) || (
                      <p className="default_text">
                        {" "}
                        {"No neighboring countries found" || <Skeleton />}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
