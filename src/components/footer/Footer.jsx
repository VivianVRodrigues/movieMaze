import React from "react";
import "./style.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="terms">
        <li className="term">Term of Use</li>
        <li className="term">Privacy Policy</li>
        <li className="term">About</li>
        <li className="term">Blog</li>
        <li className="term">FAQ</li>
      </ul>
      <div className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </div>
      <div className="icons">
        <span className="icon">
          <FaFacebookF></FaFacebookF>
        </span>
        <span className="icon">
          <FaInstagram></FaInstagram>
        </span>
        <span className="icon">
          <FaTwitter></FaTwitter>
        </span>
        <span className="icon">
          <FaLinkedin></FaLinkedin>
        </span>
      </div>
    </div>
  );
};

export default Footer;
