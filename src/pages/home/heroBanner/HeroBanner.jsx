import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState(url);

  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQuery = (e) => {
    if (e.key === "Enter" && query.length !== 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleClick = () => {
    if (query.length !== 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      <div className="wrapper">
        <div className="heroContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows, and people to discover. Expore Now
          </span>
          <div className="search">
            <input
              type="text"
              placeholder="Search for movie or TV shows"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => searchQuery(e)}
            />
            <button onClick={() => handleClick()}>Search</button>
          </div>
        </div>
        <div className="heroImage">
          <img src={background} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
