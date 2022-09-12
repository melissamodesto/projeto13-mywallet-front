import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  function handleNewEntry(type) {
    navigate("/new-entry/" + type);
  }

  return (
    <>
      <Buttons>
        <EntryAndExitButton onClick={() => handleNewEntry("deposit")}>
          <BsPlusCircle />
          Nova entrada
        </EntryAndExitButton>

        <EntryAndExitButton onClick={() => handleNewEntry("withdraw")}>
          <AiOutlineMinusCircle />
          Nova saída
        </EntryAndExitButton>
      </Buttons>
    </>
  );
}

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  margin: 0 20px;
`;

const EntryAndExitButton = styled.button`
  height: 114px;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 14px 190px 14px 14px;
  border-radius: 5px;
  font-size: 20px;
  font-family: Raleway, sans-serif;
  font-weight: 700;
  background-color: #a328d6;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #8a2be2;
    transform: scale(1.01);
  }
`;
