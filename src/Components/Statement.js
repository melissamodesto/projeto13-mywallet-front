import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Statement(props) {
  const { description, type, value, date, _id } = props;
  const [isClicked, setIsClicked] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleEditClick(e) {
    e.stopPropagation();
    navigate(`./new-entry/edit`, {
      state: { description, value, type, _id },
    });
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/statements/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        e.target.parentNode.parentNode.remove();
      });
    return;
  }

  function setComplementaryButtonsContent() {
    if (isClicked) {
      return (
        <div>
          <button onClick={(e) => handleEditClick(e)}>Editar</button>
          <button onClick={(e) => handleDeleteClick(e)}>Excluir</button>
        </div>
      );
    } else return <></>;
  }

  return (
    <li
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >
      <div>
        {" "}
        <div>
          <h1>{date}</h1>
          <h1>{description}</h1>
        </div>
        <h1>{value}</h1>
      </div>
      {setComplementaryButtonsContent()}
    </li>
  );
}
