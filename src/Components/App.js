import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialScreen from "./InitialScreen";
import Login from "./Login";
import Signup from './Singup';
import NewEntry from './NewEntry';
import NewExit from './NewExit';
import GlobalStyle from "./style/GlobalStyle";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Welcome" element={<InitialScreen />} />
          <Route path="/NewEntry" element={<NewEntry />} />
          <Route path="/NewExit" element={<NewExit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
