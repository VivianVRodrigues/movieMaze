import React, { useEffect } from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import CorouselSection from "./corouselSection/CorouselSection";

const Home = ({ setNoHeader, setNoFooter }) => {
  useEffect(() => {
    setNoFooter(false);
    setNoHeader(false);
  }, []);

  return (
    <div>
      <HeroBanner />
      <Trending></Trending>
      <CorouselSection
        title={"what's Popular"}
        options={["Movie", "TV"]}
        initalEndpoint={"movie"}
        category={"popular"}
      />
      <CorouselSection
        title={"Top Rated"}
        options={["Movie", "TV"]}
        initalEndpoint={"movie"}
        category={"top_rated"}
      />
      <CorouselSection
        title={"Upcoming"}
        options={[""]}
        initalEndpoint={"movie"}
        category={"upcoming"}
      />
      <CorouselSection
        title={"On The Air Tv shows"}
        options={[""]}
        initalEndpoint={"tv"}
        category={"on_the_air"}
      />
    </div>
  );
};

export default Home;
