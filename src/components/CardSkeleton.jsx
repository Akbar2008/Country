import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";
import { Context } from "../App";
import { useContext } from "react";

export const CardSkleton = ({ cards }) => {
   const { isDark } = useContext(Context);
  return (
    <SkeletonTheme baseColor="#8f8d8d">
      {Array(cards)
        .fill(0)
        .map((_, key) => {
          return (
            <div className={!isDark ? "card" : "card containerWhite"} key={key}>
              <Skeleton
                width={264}
                height={180}
                style={{ marginTop: "-5px" }}
              />
              <Skeleton
                count={4}
                style={{ margin: "16px 0 0 24px", width: "220px" }}
              />
            </div>
          );
        })}
    </SkeletonTheme>
  );
};

CardSkleton.propTypes = {
  cards: PropTypes.number,
};
