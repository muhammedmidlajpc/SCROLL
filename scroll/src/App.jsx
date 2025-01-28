import React from "react";
import Header from "../components/Header";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Body from "../components/Body";
import List from "../pages/List";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Body />} />
          <Route path="/list/:name" element={<List/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
