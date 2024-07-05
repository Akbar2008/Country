import Skeleton from "react-loading-skeleton";

export const InfoCardSkeleton = () => {
  return (
    <div className="info-list">
      <Skeleton className="imgSkeleton" />
      <div
        className="list_country-select"
        style={{ marginTop: -50, marginRight: -50 }}
      >
        <h1>
          <Skeleton width={124} className="mb-23" />
        </h1>
        <div className="conSkeleton infoTextSkeleton country_select-info">
          <div className="info__font" style={{ marginLeft: -10 }}>
            <p>
              <Skeleton width={207} />
            </p>
            <p>
              <Skeleton width={207} />
            </p>
            <p>
              <Skeleton width={207} />
            </p>
            <p>
              <Skeleton width={207} />
            </p>
            <p>
              <Skeleton width={207} />
            </p>
          </div>
          <div className="info__font" style={{ marginLeft: -10 }}>
            <p>
              <Skeleton width={200} />
            </p>
            <p>
              <Skeleton width={169} />
            </p>
            <p>
              <Skeleton width={249} />
            </p>
          </div>
        </div>
        <div className="country_select-info__all" style={{ marginBottom: 30 }}>
          <h3>
            <Skeleton width={128} />
          </h3>
          <div className="all_country">
            {(
              <>
                <Skeleton width={96} height={28} />
                <Skeleton width={96} height={28} />
                <Skeleton width={96} height={28} />
              </>
            ) || (
              <p className="default_text">
                <Skeleton />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
