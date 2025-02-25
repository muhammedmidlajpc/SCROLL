import React, { useEffect, useRef, useState } from "react";
import logo from "../src/assets/images/scroll.png";
import searchimg from "../src/assets/images/search.png";
import user from "../src/assets/images/vector.png";
import globe from "../src/assets/images/public.png";
import chat from "../src/assets/images/chat.svg";
import threeline from "../src/assets/images/Vector-1.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Header.css";
import { Search } from "lucide-react";
const Header = ({ coverProps }) => {
  const userid = sessionStorage.getItem("userid");
  const navigate = useNavigate();
  const [userclick, setuserclick] = useState(false);
  const userclickref = useRef(null);
  const handleuserclick = () => setuserclick(true);
  const userhandleoutsideclick = (e) => {
    if (userclickref.current && !userclickref.current.contains(e.target)) {
      setuserclick(false);
    }
  };
  const [threelineclick, setthreelineclick] = useState(false);
  const threelineref = useRef(null);
  const handlethreelineclick = () => setthreelineclick(true);
  const threelineoutsideclick = (e) => {
    if (threelineref.current && !threelineref.current.contains(e.target)) {
      setthreelineclick(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", userhandleoutsideclick);
    document.addEventListener("click", threelineoutsideclick);
    return () => {
      document.removeEventListener("click", userhandleoutsideclick);
      document.removeEventListener("click", threelineoutsideclick);
    };
  }, []);
  const chatclick = () => {
    if (userid) {
      navigate("/chat");
    } else {
      toast.error("log in to chat");
    }
  };
  const publicclick = () => {
    if (userid) {
      navigate("/public");
    } else {
      toast.error("log in to access tweets");
    }
  };
  const savedclick = () => {
    if (userid) {
      navigate("/saved");
    } else {
      toast.error("log in to access saved");
    }
  };
  const historyclick = () => {
    if (userid) {
      navigate("/watchlist");
    } else {
      toast.error("log in to access history");
    }
  };
  const handlelogout = () => {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("role");
  };
  const [search, setsearch] = useState("");
  const [searchreasult, setsearchreasult] = useState([]);
  useEffect(() => {
    if (search.trim() === "") {
      setsearchreasult([]);

      return;
    }
    axios
      .get(`https://www.omdbapi.com/?apikey=9fbf9983&s=${search}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.Search) {
          setsearchreasult(res.data.Search);
        } else {
          setsearchreasult([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [search]);
  const handlesearch = () => {};
  return (
    <header className="relative h-[500px] md:h-[600px] scrollbar-hide">
      {/* Movie Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={coverProps.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900" />
      </div>

      {/* Navbar */}
      <div className="relative z-10 px-4 py-4">
        <nav className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <button onClick={() => navigate("/")}>
            <img
              className="w-[120px] md:w-[150px] object-contain"
              src={logo}
              alt="logo"
            />
          </button>

          {/* Search Bar */}
          {/* <div> */}
          <div
            // className="sr-div "
            className="relative flex-1 mx-6 hidden md:block "
          >
            <form onClick={handlesearch}>
              <input
                placeholder="SEARCH"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="w-full h-[40px] bg-[#98aecf]/80 backdrop-blur rounded-full pl-12 pr-4 text-lg text-white placeholder-white/70 focus:outline-none"
                type="text"
              />
              <img
                className="absolute left-3 top-[20px] -translate-y-1/2 w-6 h-6"
                src={searchimg}
                alt="search"
                onClick={handlesearch}
              />
            </form>
            {search &&
              (Array.isArray(searchreasult) && searchreasult.length > 0 ? (
                <div className="absolute w-full bg-blue-200 rounded-xl rounded-t-2xl min-h-[220px] max-h-[500px] overflow-auto custom-scrollbar"
                >
                  {searchreasult.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex items-center w-full p-2 border-b border-gray-300"
                      >
                        <div className="flex-none w-[150px] p-1">
                          {console.log(item)}
                          <div
                            className="relative overflow-hidden rounded-lg"
                            // onClick={() => handlesearch(item.Title, item)}
                          >
                            <img
                              src={item.Poster}
                              alt={item.Title}
                              className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                              <h3 className="text-white text-lg font-semibold">
                                {item.Title}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow pl-10 font-black">
                          <p className="text-gray-600 text-sm">{item.Title}</p>
                          <p className="text-gray-600 text-sm">{item.Year}</p>
                          <p className="text-gray-600 text-sm">{item.Type}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="absolute w-full bg-blue-50 rounded-xl rounded-t-2xl h-[50px] hover:bg-gray-700">
                  <h3 className="m-3">No Result Found</h3>
                </div>
              ))}
          </div>
          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-8">
            <img
              src={chat}
              alt="Chat"
              className="w-8 h-8 cursor-pointer"
              onClick={chatclick}
            />
            <img
              src={globe}
              alt="Public"
              className="w-8 h-8 cursor-pointer"
              onClick={publicclick}
            />

            {/* User Dropdown */}
            <div className="relative w-8 h-8 cursor-pointer">
              <button
                onClick={handleuserclick}
                ref={userclickref}
                className="focus:outline-none"
              >
                <img src={user} alt="User" className="w-8 h-8 cursor-pointer" />
              </button>

              {userclick && (
                <div
                  className="rounded-lg shadow-md absolute flex flex-col  "
                  // className="absolute z-40 w-[180px] right-0 top-12 bg-white rounded-lg shadow-md"
                >
                  <button
                    // className=" py-2 px-4  bg-amber-400 h-[50%]"
                    className="h-[40px] w-[150px] bg-white rounded-t-lg hover:bg-gray-700 cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                  <button
                    className={`h-[40px] w-[150px] bg-white ${
                      !userid && "rounded-b-lg"
                    } hover:bg-gray-700`}
                    // className="py-2 px-4 hover:bg-gray-100 bg-amber-900 h-[50%]"
                    onClick={() => navigate("/signin")}
                  >
                    Log In
                  </button>
                  {userid && (
                    <button
                      className="h-[40px] w-[150px] bg-white rounded-b-lg hover:bg-gray-700"
                      // className="py-2 px-4 hover:bg-gray-100 bg-amber-900 h-[50%]"
                      onClick={handlelogout}
                    >
                      Log Out
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* Menu Dropdown */}
            <div className="">
              <button
                onClick={handlethreelineclick}
                ref={threelineref}
                className="focus:outline-none"
              >
                <img
                  src={threeline}
                  alt="Menu"
                  className="w-8 h-8 cursor-pointer "
                />
              </button>
              {threelineclick && (
                <ul className="absolute z-50 w-[180px] right-0 top-12 bg-white rounded-lg shadow-md">
                  <li
                    className="py-2 px-4 rounded-t-lg hover:bg-gray-700 cursor-pointer"
                    onClick={savedclick}
                  >
                    Saved
                  </li>
                  <li
                    className="py-2 px-4 rounded-b-lg hover:bg-gray-700"
                    onClick={historyclick}
                  >
                    History
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Cover Title */}
      <div className="relative z-10 px-4 py-24 md:py-32 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          {/* {coverProps.title} */}
        </h1>
      </div>
    </header>
  );
};

export default Header;
