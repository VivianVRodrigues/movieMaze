import React from "react";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import { useSelector } from "react-redux";
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";

const DetailsBanner = () => {
  const { mediaType, id } = useParams();
  const { loading, data } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const genre_ids = data?.genres?.map((g) => g.id);

  const toHrsAndMin = (totalMinutes) => {
    const hrs = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60;

    return `${hrs}h${min > 0 ? `${min}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <div className="detailsContent">
              <div className="backdropImg">
                <Img src={url.backdrop + data.backdrop_path}></Img>
              </div>

              <div className="opacityLayer"></div>

              <ContentWrapper>
                <div className="left">
                  {data.poster_path ? (
                    <Img
                      className="posterImg"
                      src={url.backdrop + data.poster_path}
                    />
                  ) : (
                    <Img className="posterImg" src={PosterFallback} />
                  )}
                </div>
                <div className="right">
                  <div className="title">
                    {`${data.name || data.title} (${dayjs(
                      data.release_date
                    ).format("YYYY")})`}
                  </div>
                  <div className="subtitle">{data.tagline}</div>
                  <Genres genre_ids={genre_ids} />
                  <div className="row">
                    <div className="rating">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                    </div>
                    <div className="playButton">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="80px"
                        height="80px"
                        viewBox="0 0 213.7 213.7"
                        enableBackground="new 0 0 213.7 213.7"
                        xmlSpace="preserve"
                      >
                        <polygon
                          className="triangle"
                          fill="none"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          points="73.5,62.5 148.5,105.8 73.5,149.1 "
                        ></polygon>
                        <circle
                          className="circle"
                          fill="none"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          cx="106.8"
                          cy="106.8"
                          r="103.3"
                        ></circle>
                      </svg>
                      <span className="text">Watch Trailer</span>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </div>
          )}
        </>
      ) : (
        <div className="detailsSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
