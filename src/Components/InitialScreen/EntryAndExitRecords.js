import styled from "styled-components";

export default function EntryAndExitRecords(props) {
  const { records } = props;

  function calculateBalance() {
    let balance = 0;
    records.forEach((record) => {
      if (record.type === "entrada") {
        balance += record.value;
      } else {
        balance -= record.value;
      }
    });
  
    return balance;
  }

  return (
    <>
      <ul>
        {records?.length > 0 ? (
          records.map(({ description, value, type, date }) => {
            return (
              <li>
                <span>{date}</span>
                <span>{description}</span>
                if ({type} === "entrada") {<Deposit>{value}</Deposit>} else{" "}
                {<Withdraw>{value}</Withdraw>}
              </li>
            );
          })
        ) : (
          <Container>
            <Text>Não há registros de entrada ou saída</Text>
          </Container>
        )}
        ;
      </ul>
      <Balance>
        <span>Saldo</span>
        if( {calculateBalance()} {">"} 0 ){" "}
        {<Deposit>{calculateBalance()}</Deposit>} else
        {<Withdraw>{calculateBalance()}</Withdraw>}
      </Balance>
    </>
  );
}

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

const Deposit = styled.div`
  color: #03ac00;
  font-size: 16px;
  font-family: Raleway, sans-serif;
`;

const Withdraw = styled.div`
  color: #c70000;
  font-size: 16px;
  font-family: Raleway, sans-serif;
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  font-size: 20px;
  font-family: Raleway, sans-serif;
`;
