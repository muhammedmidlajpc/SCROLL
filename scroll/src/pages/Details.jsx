import React, { useEffect, useState } from "react";
import { anime, manhwa } from "../../data";
import { useLocation, useParams } from "react-router-dom";
import save from "../assets/images/save.svg";
import tick from "../assets/images/tick.svg";
import reply from "../assets/images/reply.svg";
import send from "../assets/images/send.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { addreview } from "../redux/reviewslice";
import { toast } from "react-toastify";
import axios from "axios";
import trash from "../assets/images/trash.svg";

const Details = () => {
  const user = sessionStorage.getItem("userid");
  const [avgrating, setavgrating] = useState();
  const [review, setreview] = useState("");
  const [reviews, setreviews] = useState([]);
  const [rating, setrating] = useState(0);
  const location = useLocation();
  const { detail } = location.state;
  const { name } = useParams();
  const [replyflag, setreplyflag] = useState({});
  const [replytxt, setreplytxt] = useState("");
  const role = sessionStorage.getItem("role");
  const [dltflag, setdltflag] = useState();
  useEffect(() => {
    const getreview = async () => {
      axios
        .get(`https://scroll-back-end.onrender.com/review/${name}`)
        .then((res) => {
          console.log(res.data);
          setreviews(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getreview();
  }, [review, user, replytxt, dltflag]);
  const handlesaved = () => {
    let saved = [];
    // console.log(saved);
    if (user) {
      saved = [...saved, { user_id: user, file: detail }];
      axios
        .post("https://scroll-back-end.onrender.com/saved", saved)
        .then((res) => {
          console.log(res);
          toast.info(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } else {
      toast.error("Login to save!");
    }
  };
  const handlehistory = () => {
    if (user) {
      let history = [];
      history = [...history, { user_id: user, file: detail }];
      axios
        .post("https://scroll-back-end.onrender.com/history", history)
        .then((res) => {
          console.log(res);
          toast.info(res.data.message);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    } else {
      toast.error("Login to add to history!");
    }
  };
  const reviewhandler = async (e) => {
    e.preventDefault();
    if (review) {
      if (user) {
        let reviewdata = {
          user_id: user,
          data_name: name,
          content: review
        };
        await axios
          .post("https://scroll-back-end.onrender.com/review", reviewdata)
          .then((res) => {
            console.log(res);
            toast.info(res.data.message);
            setreview("");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      } else {
        toast.error("Please Login to Post Your Review");
      }
    }
  };
  const handleChangeRating = (e) => {
    setrating(e.target.value);
    console.log(rating);
    if (user) {
      let rate = {
        user_Id: user,
        data_name: name,
        rating: rating
      };
      axios
        .post("https://scroll-back-end.onrender.com/rating", rate)
        .then((res) => {
          // console.log(res);
          toast.info(res.data.message);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    } else {
      toast.error("Login to rate!");
    }
  };
  const handlereplyflag = (id) => {
    setreplyflag((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  useEffect(() => {
    const getrating = async () => {
      try {
        const res = await axios.get(`https://scroll-back-end.onrender.com/rating/${name}`);
        console.log(res);
        const r = { ar: res.data.rating[0] };
        setavgrating(r.ar.avgrating);
        console.log(r, avgrating);
      } catch (err) {
        console.log(err.message);
      }
    };
    getrating();
  }, [rating]);
  const handleReply = async (e, id) => {
    e.preventDefault();
    console.log(id);
    if (replytxt) {
      if (user) {
        let replydata = {
          user_id: user,
          data_name: name,
          content: replytxt,
          review_id: id
        };
        await axios
          .post("https://scroll-back-end.onrender.com/review/reply", replydata)
          .then((res) => {
            console.log(res.data);
            toast.info(res.data.message);
            setreplytxt("");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      } else {
        toast.error("Please Login to Post Your Review");
      }
    }
  };
  const deletereview = async (id) => {
    if (role === "admin") {
      setdltflag(true);
      try {
        await axios.delete(`https://scroll-back-end.onrender.com/review/${id}`).then((res) => {
          console.log(res);
          setdltflag(false);
          console.log(dltflag);
          toast.info(res.data.message);
        });
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    } else {
      toast.error("only admin can delete reviews");
    }
  };
  return (
    <div
      className=" bg-gray-900 scrollbar-hide w-full"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex gap-10 rounded-lg">
            <div className="relative overflow-hidden rounded-lg w-[300px] h-[500px]">
              <img
                src={detail.img}
                alt={detail.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex-none gap-10 mb-10 h-[500px] object-cover">
              <h1 className="text-2xl font-bold mb-4 text-gray-300">
                {detail.name}
              </h1>
              <div className="w-[300px]">
                <h2 className="text-l text-gray-300">Author : {detail.name}</h2>
                <h2 className="text-l text-gray-300">Genre : {detail.genre}</h2>
                <h2 className="text-l text-gray-300">Rating : {avgrating}</h2>
                <h2 className="text-l text-gray-300 overflow-auto">
                  <span>Description : </span>
                  {detail.synopsis}
                </h2>
                <div className="flex gap-4">
                  <div className="mt-2 object-cover w-fit ">
                    <img
                      src={save}
                      alt="save"
                      className="h-[30px] transition-transform duration-300 hover:scale-110"
                      onClick={handlesaved}
                    />
                  </div>
                  <div className="mt-2 object-cover w-fit ">
                    <img
                      src={tick}
                      alt="watched"
                      className="h-[30px] transition-transform duration-300 hover:scale-110"
                      onClick={handlehistory}
                    />
                  </div>
                  <div className="mt-2 object-cover w-fit ">
                    <div className="flex flex-col items-center">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleChangeRating}
                        className="slider w-full bg-gray-200 rounded-lg"
                      />
                      <div className="mt-2">
                        <span className="text-lg font-semibold text-blue-300">
                          {rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-blue-300 w-full max-w-xl mx-auto rounded-2xl">
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
                <h2 className="text-xl font-bold text-blue-950">REVIEWS</h2>
              </div>
              <div className="mt-10 w-full h-[444px] bg-blue-300 rounded-lg md:p-5 overflow-auto">
                {/* Messages */}
                <div className="space-y-3 mb-16">
                  {reviews.map((item, idx) => (
                    <div key={idx} className="space-y-3 flex flex-col">
                      {/* User Info */}
                      {console.log(item)}
                      <div className="flex items-center gap-2 mb-4 ">
                        <div className="w-10 h-10 rounded-full border-2 bg-gray-200"></div>
                        <span className="text-white font-medium">
                          {item.user_id.name}
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-lg">
                        <p className="p-2">{item.content}</p>
                      </div>
                      <div className="flex gap-1">
                        {" "}
                        <button
                          onClick={() => handlereplyflag(item._id)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                        >
                          <img src={reply} alt="reply" className="w-5 h-5" />
                          <span>Reply</span>
                        </button>
                        {role === "admin" && (
                          <button
                            onClick={() => deletereview(item._id)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                          >
                            <img src={trash} alt="delete" className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      {replyflag[item._id] && (
                        <div className="flex flex-col gap-2">
                          {item.reply.length > 0 ? (
                            item.reply.map((r, i) => (
                              <div
                                key={i}
                                className="relative w-full bg-white rounded-lg shadow-md p-2"
                              >
                                <span className="text-gray-800 font-medium">
                                  {r.user_id.name}
                                </span>
                                <p>{r.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              {/* No replies yet */}
                            </p>
                          )}
                          <form
                            onSubmit={(e) => handleReply(e, item._id)}
                            className="right-[33%] w-[250px] bg-gray-50 rounded-full flex gap-15 items-center"
                          >
                            <input
                              type="text"
                              placeholder="Add your Reply"
                              onChange={(e) => setreplytxt(e.target.value)}
                              value={replytxt}
                              className="flex-grow p-2 rounded-full bg-gray-50 text-gray-700 focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="text-white font-medium bg-blue-600 rounded-full px-4 py-2"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Input Field */}
                <form
                  onSubmit={reviewhandler}
                  className="absolute bottom-4 left-4 right-4 bg-gray-50 rounded-full flex gap-1 items-center"
                >
                  <input
                    type="text"
                    value={review}
                    onChange={(e) => setreview(e.target.value)}
                    placeholder="Add your review"
                    className="flex-grow p-2 rounded-full bg-gray-50 text-gray-700 focus:outline-none"
                  />
                  <button type="submit" className="p-2">
                    <img src={send} alt="enter" className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Details;
