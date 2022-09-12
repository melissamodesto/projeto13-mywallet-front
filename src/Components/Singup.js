import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const API_URL = "http://localhost:5000/sign-up";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [loading, setLoading] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    axios
      .post(API_URL, {
        newUser,
      })
      .then((res) => {
        alert("Usuário cadastrado com sucesso!");
        console.log(res);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err.res.status);
        console.log(err.res.data);
        alert("Erro ao cadastrar usuário");
      });

    console.log(newUser);
  }

  return (
    <>
      <Container onSubmit={registerUser}>
        <Title>MyWallet</Title>
        <Form>
          <Input
            required
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
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
          <Input
            required
            type="password"
            placeholder="Confirme a senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          ></Input>
          {!loading ? (
            <LoginButton type="submit">Cadastrar</LoginButton>
          ) : (
            <LoginButton>
              <ThreeDots color="#FFFFFF" width="35" heigth="35" />
            </LoginButton>
          )}
        </Form>
        <LoginSignUp>
          <Link
            to="/sign-in"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Já tem uma conta? Entre agora!
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
