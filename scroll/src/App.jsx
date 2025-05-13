import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import List from "./pages/List";
import SignIn from "./pages/Sign in";
import SignUp from "./pages/Sign up";
import Details from "./pages/Details";
import Saved from "./pages/Saved";
import History from "./pages/History";
import Public from "./pages/Public";
import { ToastContainer } from "react-toastify";
import Cover from "./components/Cover";
import Chat from "./pages/Chat";
import Chatbody from "./components/Chatbody";

const App = () => {
  const user = sessionStorage.getItem("userid");
  const role = sessionStorage.getItem("role");
  return (
    <div className="scrollbar-hide">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Body />} />
          <Route path="/list/:name" element={<List />} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/watchlist" element={<History />} />
          <Route path="/public" element={<Public />} />

          <Route path="/chat" element={<Chat />}>
            <Route path="/chat/:id" element={<Chatbody />} />
          </Route>

          <Route path="/cover" element={<Cover />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
