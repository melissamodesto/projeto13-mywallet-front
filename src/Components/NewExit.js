import styled from "styled-components";

export default function NewEntry() {
  return (
    <>
      <FormContainer>
        <Title>Nova saída</Title>
        <Input placeholder="Valor"></Input>
        <Input placeholder="Descrição"></Input>        <SaveButton>Salvar entrada</SaveButton>
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
