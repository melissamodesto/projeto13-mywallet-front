import styled from "styled-components";


export default function Login() {
  return (
    <>
      <FormContainer>
        <Title>MyWallet</Title>
        <Input placeholder="E-mail"></Input>
        <Input placeholder="Senha"></Input>
        <LoginButton>Entrar</LoginButton>

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
  &::placeholder {
    color: black;
  }
`;

const LoginButton = styled.button`
  background-color: #a328d6;
  border: none;
  height: 42px;
  border-radius: 5px;
  color: #fff;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 34px;
  color: #fff;
  font-family: 'Saira Stencil One', sans-serif;
  font-size: 32px
  `;