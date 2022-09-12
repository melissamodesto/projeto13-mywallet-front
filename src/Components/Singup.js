import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Form from "./InitialScreen/Form";

export default function Signup() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  useEffect(() => {
    if (token && name) {
      return navigate("/welcome");
    }
  }, []);

  return (
    <>
      <Container /* onSubmit={registerUser} */>
        <Title>MyWallet</Title>
        <Form />
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

const Title = styled.div`
  text-align: center;
  margin-bottom: 34px;
  color: #fff;
  font-family: "Saira Stencil One", sans-serif;
  font-size: 32px;
`;
