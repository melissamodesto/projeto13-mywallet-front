import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();
  const path = location.pathname;

  function logout() {
    localStorage.clear();
  }

  function setHeaderRecord() {
    if (path === "/new-entry/deposit") {
      return (
        <>
          <Title>
            Nova entrada
          </Title>
        </>
      );
    } else if (path === "/new-entry/withdraw") {
      return <>
      <Title>
        Nova saída
      </Title>
    </>
    }

    return (
      <>
        <Title>
          Olá, {props.name}
          <Link
            to="/sign-in"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <RiLogoutBoxRLine onClick={logout} />
          </Link>
        </Title>
      </>
    );
  }

  return <>{setHeaderRecord()}</>;
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  margin: 20px;
  font-size: 26px;
  font-family: Raleway, sans-serif;
  
`;
