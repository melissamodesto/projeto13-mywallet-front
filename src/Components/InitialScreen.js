import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function InitialScreen({ name }) {
  return (
    <>
      <Title>
        Olá, {name}
        <RiLogoutBoxRLine />
      </Title>
      <Container>
        <Text>Não há registros de entrada ou saída</Text>
      </Container>
      <Buttons>
        <Link to="/NewEntry" style={{textDecoration: "inherit"}}>
          <EntryAndExitButton>
            <BsPlusCircle />
            Nova entrada
          </EntryAndExitButton>
        </Link>
        <Link to="/NewExit" style={{textDecoration: "inherit"}}>
          <EntryAndExitButton>
            <AiOutlineMinusCircle />
            Nova saída
          </EntryAndExitButton>
        </Link>
      </Buttons>
    </>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 26px;
  font-family: Raleway, sans-serif;
  margin: 10px 0 10px 0;
`;

const Container = styled.div`
  height: 446px;
  width: 100%;
  margin: auto;
  border-radius: 5px;
  background-color: #fff;
`;
const Text = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #868686;
  font-size: 16px;
  font-family: Raleway, sans-serif;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const EntryAndExitButton = styled.button`
  height: 114px;
  width: 95%;
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
