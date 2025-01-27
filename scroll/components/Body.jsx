import React from "react";
import Header from "./Header";
import Home from "../pages/Home";
import { anime, manhwa } from "../data";
const Body = () => {
  return (
    <div className="min-h-screen bg-gray-900 scrollbar-hide"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-300">MOVIE</h2>
            <button className="text-gray-300 hover:text-white transition-colors">
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {anime.slice(0,10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {console.log(item)}
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-300">SERIES</h2>
            <button className="text-gray-300 hover:text-white transition-colors">
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {manhwa.slice(0,10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {console.log(item)}
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-300">ANIME</h2>
            <button className="text-gray-300 hover:text-white transition-colors">
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {anime.slice(0,10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {console.log(item)}
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-300">MANHWA</h2>
            <button className="text-gray-300 hover:text-white transition-colors">
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {manhwa.slice(0,10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {console.log(item)}
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Body;
