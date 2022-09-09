import styled from "styled-components";

export default function InitialScreen({ name }) {
  return (
    <>
      <Title>
        Olá, {name}
        <img src='./assets/logout.png'/>
      </Title>
      <Container>
        <Text>Não há registros de entrada ou saída</Text>
      </Container>
      <Buttons>
        <EntryAndExitButton>
          <img src="" />
          Nova entrada
        </EntryAndExitButton>
        <EntryAndExitButton>
          <img src="" />
          Nova saída
        </EntryAndExitButton>
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
  display: flex;
  
`;

