import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import InitialScreen from "./InitialScreen/InitialScreen";
import Login from "./Login";
import Signup from "./Singup";
import NewEntry from "./NewEntry";
import NewExit from "./NewExit";
import GlobalStyle from "./style/GlobalStyle";
import { useState } from "react";
import Token from "./Context/TokenContext";

export default function App() {
  const [token, setToken] = useState([]);

  return (
    <Token.Provider value={{ token, setToken }}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/welcome" element={<InitialScreen />} />
          <Route path="/new-entry" element={<NewEntry />} />
          <Route path="/new-exit" element={<NewExit />} />
        </Routes>
      </BrowserRouter>
    </Token.Provider>
  );
}
