import React, { useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import PlayButton from "../playbutton/PlayButton";
import VideoPopup from "../videoPopup/VideoPopup";

const Videos = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const skeleton = () => {
    return (
      <div className="videoSkeleton">
        <div className="poster skeleton"></div>
        <div className="row skeleton"></div>
      </div>
    );
  };

  //   const videoHandler = (videoId) => {
  //     setShow(true);
  //     videoId(videoId);
  //   };

  return (
    <div className="videos">
      <ContentWrapper>
        {!loading ? (
          <div className="videoItems">
            {videos?.map((video, id) => (
              <div
                className="videoItem"
                key={id}
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
              >
                <div className="thumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayButton />
                </div>
                <div className="title">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videosSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup show={show} setShow={setShow} videoId={videoId} />
    </div>
  );
};

export default Videos;
