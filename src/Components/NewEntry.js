import styled from "styled-components";
import Token from "./Context/TokenContext";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";

export default function NewEntry() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useContext(Token);
  const navigate = useNavigate();

  function depositMoney(event) {
    event.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };
    const body = {
      value,
      description,
    };
    axios
      .post("http://localhost:5000/deposit", body, config)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        navigate("/welcome");
      })
      .catch((err) => {
        console.log(err);
        alert("Não foi possível salvar a entrada");
      });
  }

  return (
    <>
      <Title>Nova entrada</Title>
      <FormContainer onSubmit={depositMoney}>
        <Input
          required
          type="text"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></Input>
        <Input
          required
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
        {!loading ? (
          <SaveButton type="submit">Salvar entrada</SaveButton>
        ) : (
          <SaveButton>
            <Bars
              color="#FFFFFF"
              height={45}
              width={45}
              ariaLabel="loading-indicator"
            />
          </SaveButton>
        )}
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
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

const SaveButton = styled.button`
  background-color: #a328d6;
  border: none;
  height: 46px;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  font-family: Raleway, sans-serif;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #8a2be2;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 34px;
  color: #fff;
  font-family: Raleway, sans-serif;
  font-size: 32px;
`;
