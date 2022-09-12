import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Login() {

  return (
    <Container>
      <Title>MyWallet</Title>
      <LoginButton>
        <Link
          to="/sign-in"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          Faça login
        </Link>
      </LoginButton>
    </Container>
  );
}

const Container = styled.div`
    margin: calc(50vh - 100px) auto;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const LoginButton = styled.button`
  background-color: #a328d6;
  border: none;
  width: 25%;
  height: 42px;
  font-size: 20px;
  font-weight: 700;
  font-family: Raleway, sans-serif;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #8a2be2;
    transform: scale(1.06);
    transition: transform 0.5s;
  }
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 34px;
  color: #fff;
  font-family: "Saira Stencil One", sans-serif;
  font-size: 62px;
`;
