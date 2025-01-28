import React from "react";
import { manhwa, anime } from "../data";
import { useParams } from "react-router-dom";
const List = () => {
  let lists = [];
  const { name } = useParams();
  console.log(typeof name);
  if (name == "movies" || name == "anime") {
    lists = anime;
    console.log(lists, anime);
  } else if (name == "series" || name == "manhwa") {
    lists = manhwa;
  }
  return (
    <div
      className="min-h-screen bg-gray-900 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <main className="max-w-7xl mx-auto my-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-flow-row grid-cols-5 gap-x-5 gap-y-10">
            {lists.map((item, idx) => (
              <div key={idx} className="flex-none w-[200px]">
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
        </section>
      </main>
    </div>
  );
};

export default List;
