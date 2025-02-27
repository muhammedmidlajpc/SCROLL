import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const List = () => {
  const [movies, setmovies] = useState([]);
  const [anime, setanime] = useState([]);
  const [manhwa, setmanhwa] = useState([]);
  const [series, setseries] = useState([]);
  const [type, settype] = useState("");
  const navigate = useNavigate();
  let lists = [];
  const { name } = useParams();
  console.log(typeof name);
  if (name == "movies") {
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
      settype("movies");
    }, []);
    lists = movies;

    console.log(lists, movies);
  } else if (name == "series") {
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
      settype("series");
    }, []);
    lists = series;
  } else if (name == "anime") {
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
      settype("anime");
    }, []);
    lists = anime;
  } else if (name == "manhwa") {
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
      settype("manhwa");
    }, []);
    lists = manhwa;
  }
  const handledetails = (data) => {
    console.log(data);
    let detail = {};
    if (type === "movies" || type === "series") {
      detail = {
        name: data.Title,
        img: data.Poster,
        year: data.Year,
        imdb: data.imdbID
      };
    } else if (type === "anime") {
      detail = {
        name: data.title,
        img: data.images.jpg.image_url || data.images.webp.image_url,
        year: data.year,
        imdb: data.score,
        // genre: data.genres,
        synopsis: data.synopsis
      };
    } else if (type === "manhwa") {
      detail = {
        name: data.attributes.titles.en_jp || data.attributes.titles.en_us,
        img: data.attributes.posterImage.original,
        year: data.attributes.startDate,
        imdb: data.attributes.averageRating,
        synopsis: data.attributes.description
      };
    }
    console.log(detail, detail);
    navigate(`/details/${detail.name}`, { state: { detail } });
  };
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
                <div
                  className="relative overflow-hidden rounded-lg"
                  onClick={(e) => handledetails(item)}
                >
                  {type == "movies" ? (
                    <img
                      src={item.Poster}
                      alt={item.Title}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : type == "series" ? (
                    <img
                      src={item.Poster}
                      alt={item.Title}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : type == "anime" ? (
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.title_english}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : type == "manhwa" ? (
                    <img
                      src={item.attributes.posterImage.original}
                      alt={item.attributes.titles.en_us}
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <img
                      src=""
                      alt=""
                      className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    {type == "movies" ? (
                      <h3 className="text-white text-lg font-semibold">
                        {item.Title}
                      </h3>
                    ) : type == "series" ? (
                      <h3 className="text-white text-lg font-semibold">
                        {item.Title}
                      </h3>
                    ) : type == "anime" ? (
                      <h3 className="text-white text-lg font-semibold">
                        {item.title_english}
                      </h3>
                    ) : type == "manhwa" ? (
                      <h3 className="text-white text-lg font-semibold">
                        {item.attributes.titles.en_us ||
                          item.attributes.titles.en_jp}
                      </h3>
                    ) : (
                      <h3 className="text-white text-lg font-semibold">name</h3>
                    )}
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
