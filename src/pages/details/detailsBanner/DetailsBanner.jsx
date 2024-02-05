import React, { useState } from "react";
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
import VideoPopup from "../videoPopup/VideoPopup";

const DetailsBanner = ({ videos, crew }) => {
  const { mediaType, id } = useParams();
  const { loading, data } = useFetch(`/${mediaType}/${id}`);
  const { data: providerData } = useFetch(
    `/${mediaType}/${id}/watch/providers`
  );

  const movieprovider =
    providerData?.results?.IN?.flatrate ||
    providerData?.results?.IN?.rent ||
    providerData?.results?.IN?.buy;

  const { url } = useSelector((state) => state.home);

  const [show, setShow] = useState(false);

  const genre_ids = data?.genres?.map((g) => g.id);

  const director = crew?.filter((member) => member.job === "Director");
  const writer = crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.job === "Story"
  );

  const toHrsAndMin = (totalMinutes) => {
    const hrs = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60;

    return `${hrs}h ${min > 0 ? `${min}m` : ""}`;
  };

  const videoPopupHandler = () => {
    setShow(true);
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
                    <div
                      className="playButton"
                      onClick={() => videoPopupHandler()}
                    >
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
                  {movieprovider?.length > 0 && (
                    <div className="providers">
                      <div className="providersheading">Available on : </div>
                      <div className="movieProviders">
                        {movieprovider?.map((provider, i) => {
                          const providerUrl = provider?.logo_path;
                          return (
                            <div className="movieProvider" key={i}>
                              <img src={url.backdrop + providerUrl} />
                            </div>
                          );
                        })}
                      </div>
                      <img
                        height="11px"
                        src="https://widget.justwatch.com/assets/JW_logo_color_10px.svg"
                      ></img>
                    </div>
                  )}
                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="overviewDiscription">{data.overview}</div>
                  </div>
                  <div className="infoDiv">
                    {data.status && (
                      <div className="info">
                        <span className="label">Status: </span>
                        <span className="context">{data.status}</span>
                      </div>
                    )}
                    {data.release_date && (
                      <div className="info">
                        <span className="label">Release Date: </span>
                        <span className="context">
                          {dayjs(data.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {data.runtime && (
                      <div className="info">
                        <span className="label">Runtime: </span>
                        <span className="context">
                          {toHrsAndMin(data.runtime)}
                        </span>
                      </div>
                    )}
                  </div>

                  {writer?.length > 0 && (
                    <div className="members">
                      <span className="label">
                        {writer.length > 1 ? "Writers: " : "Writer: "}
                      </span>
                      {writer.map((w, i) => (
                        <span className="member" key={i}>
                          {w.name}
                          {i !== writer.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                  {director?.length > 0 && (
                    <div className="members">
                      <span className="label">
                        {director.length > 1 ? "Directors: " : "Director: "}
                      </span>
                      {director.map((d, i) => (
                        <span className="member" key={i}>
                          {d.name}
                          {i !== director.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videos?.key}
                />
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
