import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import EntryAndExitRecords from "./EntryAndExitRecords";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function InitialScreen({}) {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !name) {
      return navigate("/sign-in");
    }

    axios
      .get(`${API_URL}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRecords([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header name={name} />
      <EntryAndExitRecords records={records} />
      <Footer />
    </>
  );
}
