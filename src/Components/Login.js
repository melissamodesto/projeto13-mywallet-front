import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000"

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginToApp = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/sign-in`, { email, password })
      .then((res) => {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FormContainer onSubmit={loginToApp}>
        <Title>MyWallet</Title>
        <Input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <LoginButton type="submit">
          <Link
            to="/welcome"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Entrar
          </Link>
        </LoginButton>
        <LoginSignUp>
          <Link
            to="/sign-up"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Primeira vez? Cadastre-se
          </Link>
        </LoginSignUp>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: calc(50vh - 100px) auto;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  font-size: 20px;
  &::placeholder {
    color: black;
  }
`;

const LoginButton = styled.button`
  background-color: #a328d6;
  border: none;
  height: 42px;
  font-size: 20px;
  font-weight: 700;
  font-family: Raleway, sans-serif;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #8a2be2;
  }
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 34px;
  color: #fff;
  font-family: "Saira Stencil One", sans-serif;
  font-size: 32px;
`;

const LoginSignUp = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #fff;
  font-family: "Raleway", sans-serif;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;
