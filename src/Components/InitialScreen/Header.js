import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Header({ name }) {

  function logout() {
    localStorage.clear();
  }

  return (
    <>
      <Title>
        Olá, {name}
        <Link
          to="/sign-in"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <RiLogoutBoxRLine onClick={logout}/>
        </Link>
      </Title>
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
