import React from "react";
import logo from "../src/assets/images/scroll.png";
import search from "../src/assets/images/search.png";
import user from "../src/assets/images/vector.png";
import globe from "../src/assets/images/public.png";
import threeline from "../src/assets/images/Vector-1.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = ({ coverProps }) => {
  console.log(coverProps.image);
  const navigate = useNavigate();
  const logoClick = () => {
    navigate('/')
    console.log("first");
  };
  const publicClick=()=>{
    navigate('/public')
    console.log("second");
  }
  return (
    <header className="relative h-[600px] scrollbar-hide" >
      {/* Movie Background - Displays the current cover photo */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={coverProps.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900" />
      </div>

      <div className="relative z-10 px-4 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* <Link to={"/"}> */}
          <button className="relative top-[5px] left-0" onClick={logoClick}>
            <img className="w-[150px] object-contain" src={logo} alt="logo" />
          </button>
          {/* </Link> */}
          {/* search div */}
          <div className="flex-1 mx-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                placeholder="SEARCH"
                className="w-full h-[40px] bg-[#98aecf]/80 backdrop-blur rounded-full pl-12 pr-4 text-lg text-white placeholder-white/70 focus:outline-none"
                type="text"
              />
              <img
                className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6"
                src={search}
                alt="search"
              />
            </div>
          </div>
          {/* Action icons */}
          <div className="relative top-[5px] flex items-center gap-12">
            <img src={globe} alt="Globe" className="w-8 h-8" onClick={publicClick}/>
            <div className="relative">
              <button className="relative top-[3.5px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-full">
                <img src={user} alt="User" className="w-8 h-8" />
              </button>
            </div>
            <div className="relative">
              <button className="relative top-[3.5px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-full">
                <img src={threeline} alt="Menu" className="w-8 h-8" />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="relative z-10 px-4 py-32 max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-4">
          {coverProps.title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
