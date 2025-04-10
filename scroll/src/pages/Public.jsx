import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addreview } from "../redux/reviewslice";
import { useParams } from "react-router-dom";
import reply from "../assets/images/reply.svg";
import send from "../assets/images/send.svg";
import photo from "../assets/images/photo.svg";
import trash from "../assets/images/trash.svg";
import axios from "axios";
import { toast } from "react-toastify";
const Public = () => {
  const user = sessionStorage.getItem("userid");
  const role = sessionStorage.getItem("role");
  const [tweets, settweets] = useState([]);
  const [review, setreview] = useState("");
  const [replytxt, setreplytxt] = useState("");
  const [dltflag, setdltflag] = useState();
  const [replyflag, setreplyflag] = useState({});
  const [tweetimg, settweetimg] = useState();
  const [imgupldflag, setimgupldflag] = useState(false);
  useEffect(() => {
    const gettweets = async () => {
      try {
        const res = await axios.get("https://scroll-tb0k.onrender.com/tweet");
        console.log(res);
        settweets(res.data.tweets);
        setdltflag(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    gettweets();
  }, [review, replytxt, dltflag, tweetimg]);
  const handledelete = async (tweetid, tweet) => {
    try {
      await axios
        .delete(`https://scroll-tb0k.onrender.com/tweet/${tweetid}`)
        .then((res) => {
          console.log(res);
          setdltflag(res.data.status);
          console.log(dltflag);
          toast.info(res.data.message);
        });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };
  console.log(replytxt);
  const handlereplysend = (e, tweetid) => {
    e.preventDefault();
    try {
      const replytext = {
        user_id: user,
        tweetid: tweetid,
        content: replytxt
      };
      console.log(replytxt);
      axios.post("https://scroll-tb0k.onrender.com/reply", replytext).then((res) => {
        console.log(res);
        toast.info(res.data.message);

        setreplytxt("");
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const handlereplyflag = (id, item) => {
    setreplyflag((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
    setreplytxt("");
  };
  const upldimgflag = () => {
    setimgupldflag(!imgupldflag);
  };
  const handleImgchange = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    settweetimg(e.target.files[0]);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setimgupldflag(false);
      console.log(typeof tweetimg, tweetimg);

      if (tweetimg) {
        const reader = new FileReader();
        reader.readAsDataURL(tweetimg);
        reader.onload = async () => {
          const base64image = reader.result;
          const payload = {
            user_id: user,
            content: review,
            image: base64image
          };
          console.log(payload);

          try {
            const res = await axios.post(
              "https://scroll-tb0k.onrender.com/tweetimg",
              payload
            );
            console.log(res.data.message);
            toast.info(res.data.message);
            settweetimg(null); // Reset the file input
            setreview("");
          } catch (error) {
            console.error("Error uploading image:", error.message);
            toast.error("choose smaller image");
          }
        };
      } else {
        const form = {
          user_id: user,
          content: review
        };
        console.log(user, form);
        axios.post("https://scroll-tb0k.onrender.com/tweet", form).then((res) => {
          console.log(res.data.message);
          toast.info(res.data.message);
          setreview("");
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="overflow-auto scrollbar-hide">
      <div className="relative bg-gray-900 w-full max-w-screen mx-auto  overflow-auto scrollbar-hide">
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
          <h2 className="text-xl font-bold text-blue-950">REVIEWS</h2>
        </div>
        <div className="pt-16 w-full h-full bg-gray-900 rounded-lg p-4 md:p-5 shadow-lg">
          {/* Messages */}
          <div className="space-y-3 mb-16 pt-16 overflow-auto h-[500px] scrollbar scrollbar-track-gray-900 scrollbar-thumb-blue-600 hover:scrollbar-thumb-blue-400">
            {tweets.map((item, idx) => (
              <div
                key={idx}
                className="space-y-3 flex flex-col scrollbar scrollbar-track-gray-900 scrollbar-thumb-blue-600 hover:scrollbar-thumb-blue-400"
              >
                {console.log(item)}
                {/* User Info */}
                <div className="flex items-center gap-2 mb-4 ">
                  <div className="w-10 h-10 rounded-full border-2 bg-gray-200"></div>
                  <span className="text-white font-medium">{item.user_id.name}</span>
                </div>
                <div className="w-fit bg-white rounded-lg">
                  {item.image && (
                    <div className="w-fit h-fit">
                      <img src={item.image} alt="" />
                    </div>
                  )}
                  <p className="p-2">{item.content}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handlereplyflag(item._id, item)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <img src={reply} alt="reply" className="w-5 h-5" />
                    <span>Reply</span>
                  </button>
                  {role === "admin" && (
                    <button
                      onClick={() => handledelete(item._id, item)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <img src={trash} alt="trash" className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {replyflag[item._id] && (
                  <div>
                    <div className="flex flex-col gap-1">
                      {item.reply.length > 0 ? (
                        item.reply.map((el, i) => (
                          <div
                            key={i}
                            className="relative w-full bg-white rounded-lg shadow-md p-2"
                          >
                            <span className="text-gray-800 font-medium">
                              {el.user_id}
                            </span>
                            <p>{el.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No replies yet</p>
                      )}
                      <form
                        onSubmit={(e) => handlereplysend(e, item._id)}
                        className="right-[33%] w-[500px] bg-gray-50 rounded-full flex gap-1 items-center"
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
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <form
            // onSubmit={reviewhandler}
            onSubmit={handlesubmit}
            className="absolute bottom-4 right-[35%] w-[500px] bg-gray-50 rounded-full flex gap-1 items-center"
          >
            <input
              type="text"
              value={review}
              onChange={(e) => setreview(e.target.value)}
              placeholder="Add your tweet"
              className="flex-grow p-2 rounded-full bg-gray-50 text-gray-700 focus:outline-none"
            />
            <img
              src={photo}
              alt="upload image"
              className="w-6 h-6"
              onClick={upldimgflag}
            />
            {imgupldflag && (
              <div className="absolute z-50 w-[200px] right-[50px] top-[-30px] bg-white rounded-lg shadow-md overflow-visible">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImgchange}
                  // onChange={(e) => settweetimg(e.target.files[0])}
                />
              </div>
            )}
            {/* {previwflag && (
              <div className="absolute z-50 w-[200px] right-[50px] top-[-30px] bg-white rounded-lg shadow-md overflow-visible">
                <img className="w-[50px] h-[50px] " src={previwflag} alt="" />
              </div>
            )} */}
            <button type="submit" className="p-2">
              <img src={send} alt="enter" className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Public;
