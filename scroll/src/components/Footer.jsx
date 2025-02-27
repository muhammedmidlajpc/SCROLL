import React from "react";
import logo from "../assets/images/scroll.png";
import insta from "../assets/images/insta.png";
import fb from "../assets/images/fb.png";
import gmail from "../assets/images/gmail.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-900 py-8 text-gray-300">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black/50 to-black/70" />
      
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-6 md:space-y-0">
        
        {/* Logo */}
        <img
          src={logo}
          alt="SCROLL"
          className="h-16 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-lg font-semibold">
          <h2 className="cursor-pointer hover:text-amber-400" onClick={() => navigate("/list/movies")}>MOVIE</h2>
          <h2 className="cursor-pointer hover:text-amber-400" onClick={() => navigate("/list/series")}>SERIES</h2>
          <h2 className="cursor-pointer hover:text-amber-400" onClick={() => navigate("/list/anime")}>ANIME</h2>
          <h2 className="cursor-pointer hover:text-amber-400" onClick={() => navigate("/list/manhwa")}>MANHWA</h2>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-[50px]">
          <img
            src={insta}
            alt="Instagram"
            className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => window.location.href = "https://www.instagram.com"}
          />
          <img
            src={fb}
            alt="Facebook"
            className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => window.location.href = "https://www.facebook.com"}
          />
          <img
            src={gmail}
            alt="Gmail"
            className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => window.location.href = "https://www.gmail.com"}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
