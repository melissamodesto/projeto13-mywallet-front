import React, { useState, useEffect } from "react";
import Header from "./Header";
import Statements from "../Statements";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function InitialScreen({}) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !name) {
      return navigate("/sign-in");
    }
  }, []);

  return (
    <>
      <Header name={name}></Header>
      <Statements />
      <Footer />
    </>
  );
}
