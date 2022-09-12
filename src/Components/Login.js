import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Token from "./Context/TokenContext";

const API_URL = "http://localhost:5000/sign-in";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(Token);

  function loginToApp(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(API_URL, { email, password })
      .then((res) => {
        setLoading(false);
        setToken(res.data);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.token);
        navigate("/welcome");
      })
      .catch((err) => {
        console.log(err);
        alert("Credenciais inválidas");
      });
  }

  return (
    <>
      <Container>
        <Title>MyWallet</Title>

        <Form onSubmit={loginToApp}>
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
          {!loading ? (
            <LoginButton type="submit">Entrar</LoginButton>
          ) : (
            <LoginButton>
              <ThreeDots color="#FFFFFF" width="35" heigth="35" />
            </LoginButton>
          )}
        </Form>

        <LoginSignUp>
          <Link
            to="/sign-up"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Primeira vez? Cadastre-se
          </Link>
        </LoginSignUp>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: calc(50vh - 100px) auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  justify-content: center;
  display: flex;
  align-items: center;
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
