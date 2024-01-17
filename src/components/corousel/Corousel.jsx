import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import dayjs from "dayjs";

const Corousel = ({ data, loading }) => {
  const corouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="poster skeleton"></div>
        <div className="textBlock">
          <div className="text skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="corousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill className="arrow left" />
        <BsFillArrowRightCircleFill className="arrow right" />

        {!loading ? (
          <div className="corouselItems">
            {data?.results?.map((item) => {
              const src = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div className="corouselItem" key={item.id}>
                  <div className="poster">
                    <Img src={src}></Img>
                  </div>
                  <div className="textBlock">
                    <span className="text">{item.title || item.name}</span>
                    <div className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Corousel;
