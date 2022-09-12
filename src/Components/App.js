import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import InitialScreen from "./InitialScreen/InitialScreen";
import Login from "./Login";
import Signup from "./Singup";
import NewEntry from "./NewEntry";
import GlobalStyle from "./style/GlobalStyle";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/welcome" element={<InitialScreen />} />
          <Route path="/new-entry/:type" element={<NewEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
