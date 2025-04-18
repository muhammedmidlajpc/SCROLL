import React, { useEffect, useState } from "react";
import { coverPhotos } from "../../data";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const [currentCvrIdx, setcurrentCvrIdx] = useState(0);

  useEffect(() => {
    const intervall = setInterval(() => {
      setcurrentCvrIdx((prevIdx) => (prevIdx + 1) % coverPhotos.length);
    }, [5000]);
    return () => clearInterval(intervall);
  }, [coverPhotos.length]);

  return (
    <div
      className="scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <Header coverProps={coverPhotos[currentCvrIdx]} />
      {/* {console.log(coverPhotos[0])} */}
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
