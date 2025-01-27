import React from "react";
import logo from "../src/assets/images/scroll.png";
import insta from "../src/assets/images/insta.png";
import fb from "../src/assets/images/fb.png";
import gmail from "../src/assets/images/gmail.png";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const logoClick = () => {
    navigate("/");
    console.log("first");
  };
  const movies = () => {
    navigate("/movies");
    console.log("first");
  };
  const manhwa = () => {
    navigate("/manhwa");
    console.log("first");
  };
  const anime = () => {
    navigate("/anime");
    console.log("first");
  };
  const series = () => {
    navigate("/series");
    console.log("first");
  };
  const instaClick = () => {
    window.location.href = "https://www.instagram.com";
    console.log("insta");
  };
  const fbClick = () => {
    window.location.href = "https://www.facebook.com";
    console.log("first");
  };
  const gmailClick = () => {
    window.location.href = "https://www.gmail.com";
    console.log("first");
  };
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900  via-black/50 to-black/70" />
      <div className="w-full bg-gray-900 h-[300px]">
        <div className="flex relative top-[150px] items-center justify-between max-w-7xl mx-auto">
          <img
            src={logo}
            alt="SCROLL"
            className="h-[100px]"
            onClick={logoClick}
          />
          <nav className="flex gap-10">
            <h2 className="text-xl font-bold text-gray-300" onClick={movies}>
              MOVIE
            </h2>
            <h2 className="text-xl font-bold text-gray-300" onClick={series}>
              SERIES
            </h2>
            <h2 className="text-xl font-bold text-gray-300" onClick={anime}>
              ANIME
            </h2>
            <h2 className="text-xl font-bold text-gray-300" onClick={manhwa}>
              MANHWA
            </h2>
          </nav>
          <div className="flex gap-10">
            <img
              src={insta}
              alt="instagram"
              className="h-[30px] w-[30px]"
              onClick={instaClick}
            />
            <img
              src={fb}
              alt="FaceBook"
              className="h-[30px] w-[30px]"
              onClick={fbClick}
            />
            <img
              src={gmail}
              alt="Mail"
              className="h-[30px] w-[30px]"
              onClick={gmailClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
