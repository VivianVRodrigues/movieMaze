import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  const tabsHandler = (currentTab) => {
    currentTab = currentTab.toLowerCase();
    setEndPoint(currentTab);
  };

  return (
    <div className="corouselSection">
      <ContentWrapper>
        <span className="corouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} tabsHandler={tabsHandler} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
