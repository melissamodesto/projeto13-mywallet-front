import React, { useState, useEffect } from "react";
import axios from "axios";
import Statement from "./Statement";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Statements() {
  const token = localStorage.getItem("token");
  const [statements, setStatements] = useState([]);
  const [requestError, setRequestError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/statements`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsLoading(false);

        setStatements([...res.data]);
      })
      .catch((error) => {
        setIsLoading(false);
        setRequestError(error);
      });
  }, []);

  function setErrorContainerContent() {
    let errorMessage = "";

    switch (requestError.res?.status) {
      case 0:
        errorMessage = "Erro de conexão. Tente novamente.";
        break;
      case 500:
        errorMessage = "Algo de errado aconteceu. Tente novamente!";
        break;
      default:
        errorMessage = (
          <Container>Não há registros de entrada ou saída</Container>
        );
        break;
    }
    return (
      <>
        <p>{errorMessage}</p>
      </>
    );
  }

  function calcBalance() {
    let balance = statements.reduce((accumulator, { value, type }) => {
      const valueAsNumber = parseFloat(value);
      return type === "deposit"
        ? accumulator + valueAsNumber
        : accumulator - valueAsNumber;
    }, 0);

    const balanceAsNumber = parseFloat(balance).toFixed(2);

    return balanceAsNumber;
  }

  function setBalanceContainerContent() {
    return statements.length > 0 ? (
      <div>
        <p>Saldo</p>
        <p>{calcBalance()}</p>
      </div>
    ) : (
      <></>
    );
  }

  return (
    <Container>
      <ul>
        {!isLoading ? (
          statements?.length > 0 ? (
            statements.map(({ description, type, value, date, _id }, index) => {
              return (
                <Statement
                  key={index}
                  description={description}
                  type={type}
                  value={value}
                  date={date}
                  _id={_id}
                ></Statement>
              );
            })
          ) : (
            setErrorContainerContent()
          )
        ) : (
          <Loading>
            <ThreeDots color="#868686" />
          </Loading>
        )}
      </ul>

      {setBalanceContainerContent()}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 446px;

  margin: 0 20px;

  border-radius: 5px;
  background-color: #fff;
  font-size: 20px;
  font-weight: 700;
  font-family: "Raleway", sans-serif;
  color: #868686;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 446px;
  width: 100%;
  margin: auto;
  border-radius: 5px;
  background-color: #fff;
  color: #868686;
`;
