import React from "react";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import Videos from "./videos/Videos";

const Details = () => {
  const { mediaType, id } = useParams();
  // const { url } = useSelector((state) => state.home);

  const { loading: videoLoading, data: videoData } = useFetch(
    `/${mediaType}/${id}/videos`
  );

  const { loading: creditsLoading, data: creditsData } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner
        videos={videoData?.results?.[0]}
        crew={creditsData?.crew}
      />
      <Cast cast={creditsData?.cast} loading={creditsLoading} />
      <Videos videos={videoData?.results} loading={videoLoading} />
    </div>
  );
};

export default Details;
