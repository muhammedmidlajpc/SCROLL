import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Saved = () => {
  const user = sessionStorage.getItem("userid");
  const navigate = useNavigate();
  const [saved, setsaved] = useState([]);
  useEffect(() => {
    const fetchsaved = async () => {
      await axios.get(`https://scroll-tb0k.onrender.com/saved/${user}`).then((res) => {
        console.log(res.data);
        setsaved(res.data.data);
      });
    };
    fetchsaved();
  }, []);
  const handledetails = (name, item) => {
    let detail = {
      name: item.file.name,
      img: item.file.img,
      year: item.file.year,
      imdb: item.file.imdb
    };
    navigate(`/details/${name}`, { state: { detail } });
  };
  return (
    <div
      className="min-h-screen bg-gray-900 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <main className="max-w-7xl mx-auto my-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-flow-row grid-cols-5 gap-x-5 gap-y-10">
            {saved.map((item, idx) => (
              <div
                key={idx}
                className="flex-none w-[200px]"
                onClick={() => handledetails(item.file.name, item)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.file.img}
                    alt={item.file.name}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-lg font-semibold">
                      {item.file.name}
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

export default Saved;
