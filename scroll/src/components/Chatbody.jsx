import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import socket from "../utils/socket";

const Chatbody = () => {
  const location = useLocation();
  const { id } = useParams();
  const { recieverinfo } = location.state;
  const userId = sessionStorage.getItem("userid");
  const [sender_id, setsender_id] = useState();
  const reciverId = id;
  const [message, setMessage] = useState("");
  const [chats, setchats] = useState([]);
  console.log(userId);
  console.log(reciverId);
  useEffect(
    () => {
      if (!userId) return; // Prevent running when userId is not set
      console.log("first");
      const getmessages = async () => {
        await axios
          .get(`http://localhost:5000/chat`, {
            params: {
              sender_id: userId,
              reciver_id: reciverId
            }
          })
          .then((res) => {
            console.log(res.data);
            setchats(res.data.data);
          });
        console.log(sender_id);
      };
      getmessages();
    },
    [message] // [message] when using socket.io there is no need to rerender the useeffect every time the message is changed
  );
  useEffect(() => {
    setsender_id(userId);
    // // console.log(userId);
    socket.connect();
    socket.on("receiveMessage", (newMessage) => {
      setchats((prevChats=[]) => {
        if (
          !prevChats.some(
            (msg) =>
              msg.message === newMessage.message &&
              msg.sender_id === newMessage.sender_id
          )
        ) {
          return [...prevChats, newMessage];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      //this is better than  // if (message) {
      return;
    }

    const msgdata = {
      sender_id: sender_id,
      reciver_id: reciverId,
      message: message
    };
    // Emit the message via Socket.io
    socket.emit("sendMessage", msgdata);
    try {
      await axios.post("http://localhost:5000/chat", msgdata).then((res) => {
        console.log(res.data);
        toast.info(res.data.message);
        setMessage("");
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-[#0a0d14]">
      {/* user info */}
      <div className="bg-gradient-to-b from-black to-transparent p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-wider">
            {recieverinfo.name}
          </h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a0d14] to-[#141824]">
        {chats?.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender_id == userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender_id === userId
                  ? "bg-gradient-to-r from-blue-900 to-purple-900 text-gray-100"
                  : "bg-gray-800/60 text-gray-300"
              } backdrop-blur-sm shadow-lg`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="bg-gradient-to-t from-black to-transparent p-4 border-t border-gray-800"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 bg-gray-800/50 text-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-700 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-2 rounded-full hover:from-blue-800 hover:to-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbody;
