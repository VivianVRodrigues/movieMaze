import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import "./style.scss";

import logo from "../../assets/filmFlare.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileCondition, setMobileCondition] = useState("");
  const [show, setShow] = useState("top");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const openSearch = () => {
    setShowSearch(true);
    setMobileCondition("");
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileCondition("showMobileMenu");
  };

  const searchQueryHandler = () => {
    if (e.key === "Enter" && query.length !== 0) {
      navigate(`/search/${query}`);
    }
    setTimeout(() => {
      setShowSearch(false);
    }, 1000);
  };

  return (
    <header className={`header ${mobileCondition} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} />
        </div>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch />
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
                onKeyUp={() => searchQueryHandler()}
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
