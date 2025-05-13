import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import reply from "../assets/images/reply.svg";
import send from "../assets/images/send.svg";
import photo from "../assets/images/photo.svg";
import trash from "../assets/images/trash.svg";

const Public = () => {
  const user = sessionStorage.getItem("userid");
  const role = sessionStorage.getItem("role");
  const [tweets, setTweets] = useState([]);
  const [review, setReview] = useState("");
  const [replyTxt, setReplyTxt] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [replyFlag, setReplyFlag] = useState({});
  const [tweetImg, setTweetImg] = useState(null);
  const [imgUploadFlag, setImgUploadFlag] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tweet");
        setTweets(res.data.tweets);
      } catch (err) {
        console.error("Error fetching tweets:", err.message);
      }
    };
    fetchTweets();
  }, [deleteTrigger]);

  const handleDelete = async (tweetId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/tweet/${tweetId}`);
      toast.info(res.data.message);
      setDeleteTrigger(!deleteTrigger);
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  const handleReplySend = async (e, tweetId) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: user,
        tweetid: tweetId,
        content: replyTxt
      };
      const res = await axios.post("http://localhost:5000/reply", payload);
      toast.info(res.data.message);
      setReplyTxt("");
      setDeleteTrigger(!deleteTrigger); // Refresh list
    } catch (err) {
      console.error("Reply error:", err.message);
    }
  };

  const toggleReplyFlag = (id) => {
    setReplyFlag((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
    setReplyTxt("");
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setTweetImg(file);

    const reader = new FileReader();
    reader.onload = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setImgUploadFlag(false);

      const payload = {
        user_id: user,
        content: review,
      };

      if (tweetImg) {
        payload.image = await toBase64(tweetImg);
      }

      const endpoint = tweetImg ? "/tweetimg" : "/tweet";
      const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
      toast.info(res.data.message);
      setReview("");
      setTweetImg(null);
      setPreviewImg(null);
      setDeleteTrigger(!deleteTrigger);
    } catch (err) {
      console.error("Submit error:", err.message);
      toast.error("Failed to submit tweet.");
    }
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <div className="relative bg-gray-900 w-full max-w-screen mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
          <h2 className="text-xl font-bold text-blue-950">REVIEWS</h2>
        </div>

        <div className="pt-16 w-full h-full bg-gray-900 rounded-lg p-4 md:p-5 shadow-lg">
          <div className="space-y-3 mb-16 pt-16 overflow-auto h-[500px] scrollbar scrollbar-track-gray-900 scrollbar-thumb-blue-600 hover:scrollbar-thumb-blue-400">
            {tweets.length === 0 ? (
              <p className="text-white">No tweets yet</p>
            ) : (
              tweets
                .filter((item) => item && item.user_id)
                .map((item, idx) => (
                  <div key={idx} className="space-y-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full border-2 bg-gray-200"></div>
                      <span className="text-white font-medium">
                        {item.user_id.name}
                      </span>
                    </div>

                    <div className="w-fit bg-white rounded-lg">
                      {item.image && (
                        <div className="w-fit h-fit">
                          <img src={item.image} alt="tweet" />
                        </div>
                      )}
                      <p className="p-2">{item.content}</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => toggleReplyFlag(item._id)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                      >
                        <img src={reply} alt="Reply" className="w-5 h-5" />
                        <span>Reply</span>
                      </button>

                      {role === "admin" && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                        >
                          <img src={trash} alt="Delete" className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {replyFlag[item._id] && (
                      <div className="flex flex-col gap-2">
                        {item.reply.length > 0 ? (
                          item.reply.map((el, i) => (
                            <div key={i} className="bg-white p-2 rounded-lg">
                              <span className="text-black font-medium">
                                {el.user_id?.name || "Unknown User"}
                              </span>
                              <p>{el.content}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No replies yet</p>
                        )}

                        <form
                          onSubmit={(e) => handleReplySend(e, item._id)}
                          className="w-full md:w-[500px] bg-gray-50 rounded-full flex gap-2 items-center"
                        >
                          <input
                            type="text"
                            placeholder="Add your reply"
                            value={replyTxt}
                            onChange={(e) => setReplyTxt(e.target.value)}
                            className="flex-grow p-2 bg-gray-50 text-gray-700 rounded-full focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="text-white bg-blue-600 rounded-full px-4 py-2"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-4 right-[5%] md:right-[35%] w-[90%] md:w-[500px] bg-gray-50 rounded-full flex gap-2 items-center p-2"
          >
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Add your tweet"
              className="flex-grow p-2 bg-gray-50 text-gray-700 rounded-full focus:outline-none"
            />
            <img
              src={photo}
              alt="Upload"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setImgUploadFlag(!imgUploadFlag)}
            />

            {imgUploadFlag && (
              <div className="absolute z-50 right-[50px] bottom-[50px] bg-white p-2 rounded-lg shadow-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                />
                {previewImg && (
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="w-20 h-20 mt-2 rounded"
                  />
                )}
              </div>
            )}

            <button type="submit" className="p-2">
              <img src={send} alt="Send" className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Public;
