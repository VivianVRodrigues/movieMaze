import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import "./style.scss";

import logo from "../../assets/filmFlare-logo.png";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileCondition, setMobileCondition] = useState("");
  const [show, setShow] = useState("top");
  const [query, setQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const headerHandler = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      if (currentScrollY > lastScrollY) {
        setShow("hide");
        setMobileCondition("");
      } else {
        setShow("show");
      }

      setLastScrollY(currentScrollY);
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerHandler);

    return () => {
      window.removeEventListener("scroll", headerHandler);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileCondition("");
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileCondition("showMobileMenu");
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length !== 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileCondition("");
  };

  return (
    <header className={`header ${mobileCondition} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} />
          <span>FILMFLARE</span>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movies")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={() => openSearch()} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={() => openSearch()} />
          {mobileCondition === "showMobileMenu" ? (
            <VscChromeClose
              onClick={() => {
                setMobileCondition("hideMobileMenu");
              }}
            />
          ) : (
            <SlMenu onClick={() => openMobileMenu()} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movies or TV shows"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(e) => searchQueryHandler(e)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
