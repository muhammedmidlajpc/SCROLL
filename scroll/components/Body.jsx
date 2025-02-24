import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "../pages/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Body = () => {
  const navigate = useNavigate();
  const moviesr = () => {
    navigate("/list/movies");
  };
  const seriesr = () => {
    navigate("/list/series");
  };
  const animer = () => {
    navigate("/list/anime");
  };
  const manhwar = () => {
    navigate("/list/manhwa");
  };
  const handledetails = (name, data, item) => {
    console.log(data);
    let detail = {};
    if (item === "Movies" || item === "Series") {
      console.log(name);
      detail = {
        name: data.Title,
        img: data.Poster,
        year: data.Year,
        imdb: data.imdbID
      };
    } else if (item === "Anime") {
      detail = {
        name: data.title,
        img: data.images.jpg.image_url || data.images.webp.image_url,
        year: data.year,
        imdb: data.score,
        // genre: data.genres,
        synopsis: data.synopsis
      };
    } else if (item === "Manhwa") {
      detail = {
        name: data.attributes.titles.en_jp || data.attributes.titles.en_us,
        img: data.attributes.posterImage.original,
        year: data.attributes.startDate,
        imdb: data.attributes.averageRating,
        synopsis: data.attributes.description
      };
    }
    console.log(name, detail, detail);
    navigate(`/details/${name}`, { state: { detail } });
  };

  const role = sessionStorage.getItem("role");
  console.log(role)
  const handlecover = () => {
    navigate("/cover");
  };

  const [movies, setmovies] = useState([]);

  useEffect(() => {
    const fetchmovies = async () => {
      await axios
        .get(
          // `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          " http://www.omdbapi.com/?s=movie&y=2025&apikey=9fbf9983"
        )
        .then((res) => {
          // console.log(res.data.Search);
          setmovies(res.data.Search);
          console.log(typeof movies);
        })
        .catch((err) => {
          console.error("error getting movies", err);
        });
    };
    fetchmovies();
  }, []);
  const [anime, setanime] = useState([]);

  useEffect(() => {
    const fetchanime = async () => {
      await axios
        .get(
          // `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          "https://api.jikan.moe/v4/top/anime"
        )
        .then((res) => {
          // console.log(res.data.data);
          setanime(res.data.data);
        })
        .catch((err) => {
          console.error("error getting movies", err);
        });
    };
    fetchanime();
  }, []);
  const [manhwa, setmanhwa] = useState([]);

  useEffect(() => {
    const fetchmanhwa = async () => {
      await axios
        .get(
          // `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          "https://kitsu.io/api/edge/manga"
        )
        .then((res) => {
          // console.log(res.data.data);
          setmanhwa(res.data.data);
        })
        .catch((err) => {
          console.error("error getting movies", err);
        });
    };
    fetchmanhwa();
  }, []);
  const [series, setseries] = useState([]);

  useEffect(() => {
    const fetchseries = async () => {
      await axios
        .get(
          // `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          "http://www.omdbapi.com/?s=series&y=2024&type=series&apikey=9fbf9983"
        )
        .then((res) => {
          // console.log(res.data.Search);
          setseries(res.data.Search);
        })
        .catch((err) => {
          console.error("error getting movies", err);
        });
    };
    fetchseries();
  }, []);
  return (
    <div
      className="min-h-screen bg-gray-900 scrollbar-hide "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <main className="max-w-7xl mx-auto px-4 py-8">
        {role === "admin" && (
          <div>
            <h1
              className="text-4xl mb-[100px] font-bold text-gray-300"
              onClick={handlecover}
            >
              Edit cover
            </h1>
          </div>
        )}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-300">MOVIE</h2>
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={moviesr}
            >
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {movies.map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {/* {console.log(item)} */}
                  <div
                    className="relative overflow-hidden rounded-lg"
                    onClick={() => handledetails(item.Title, item, "Movies")}
                  >
                    <img
                      src={item.Poster}
                      alt={item.Title}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.Title}
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
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={seriesr}
            >
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {series.slice(0, 10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {/* {console.log(item)} */}
                  <div
                    className="relative overflow-hidden rounded-lg"
                    onClick={() => handledetails(item.Title, item, "Series")}
                  >
                    <img
                      src={item.Poster}
                      alt={item.Title}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.Title}
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
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={animer}
            >
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {anime.slice(0, 10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {/* {console.log(item)} */}
                  <div
                    className="relative overflow-hidden rounded-lg"
                    onClick={() =>
                      handledetails(item.title_english, item, "Anime")
                    }
                  >
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.title_english}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.title_english}
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
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={manhwar}
            >
              MORE
            </button>
          </div>
          <div className="relative">
            <div
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {manhwa.slice(0, 10).map((item, idx) => (
                <div key={idx} className="flex-none w-[200px]">
                  {/* {console.log(item)} */}
                  <div
                    className="relative overflow-hidden rounded-lg"
                    onClick={() =>
                      handledetails(
                        item.attributes.titles.en_jp ||
                          item.attributes.titles.en_us,
                        item,
                        "Manhwa"
                      )
                    }
                  >
                    <img
                      src={item.attributes.posterImage.original}
                      alt={item.attributes.titles.en_us}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-lg font-semibold">
                        {item.attributes.titles.en_us ||
                          item.attributes.titles.en_jp}
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
