import axios from "axios";
import { Search, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Chat = () => {
  const [users, setusers] = useState([]);
  const [search, setsearch] = useState("");
  const [searchflag, setsearchflag] = useState(false);
  const [searchresult, setsearchresult] = useState([]);
  const userId = sessionStorage.getItem("userid");
  const navigate = useNavigate();
//   console.log(userId);
  useEffect(() => {
    const getusers = async () => {
      if (userId) {
        try {
          const res = await axios.get(
            `https://scroll-back-end.onrender.com/getusers/${userId}`
          );
        //   console.log(res.data);
          setusers(res.data.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    getusers();
  }, [userId]);
  //   console.log(users);
//   console.log(typeof search, searchflag);
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setsearch(value);
    if (value.length != "") {
      setsearchflag(true);
    //   console.log(searchflag);
      const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setsearchresult(filteredUsers);
    } else {
      setsearchflag(false);
      setsearchresult([]);
    }
  };
  const handleselectuser = (item) => {
    // console.log("selected user", item);
    const id = item._id;
    const recieverinfo = {
      _id: item._id,
      name: item.name
    };
    navigate(`/chat/${id}`, { state: { recieverinfo } });
  };
  return (
    <div className="flex relative bg-gray-900 w-full max-w-screen mx-auto  overflow-auto scrollbar-hide h-screen">
      <div className="w-[40%] flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a0d14] to-[#141824] border border-amber-50">
        <div className="relative pb-2 border-b border-gray-800 ">
          <div>
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder="Search..."
              className="bg-gray-800/50 text-gray-300 px-4 py-1.5 rounded-full w-[260px] focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
            <Search className="absolute right-7 top-2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col">
          {searchflag ? (
            <div>
              {searchresult.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div
                      className="cursor-pointer w-full h-[50px] relative flex bg-gray-500 items-center rounded-lg gap-2"
                      onClick={() => handleselectuser(item)}
                    >
                      <div className="rounded-full w-[40px] h-[40px] bg-amber-100 overflow-hidden">
                        <img src="" alt="" className="h-fit w-fit " />
                      </div>
                      <div>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {users.map((user, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full h-[50px] relative flex bg-gray-500 items-center rounded-lg gap-2 mb-2"
                    onClick={() => handleselectuser(user)}
                  >
                    <div className="rounded-full w-[40px] h-[40px] bg-amber-100 overflow-hidden">
                      <img src="" alt="" className="h-fit w-fit " />
                    </div>
                    <div>
                      <p>{user.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="w-[60%] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
