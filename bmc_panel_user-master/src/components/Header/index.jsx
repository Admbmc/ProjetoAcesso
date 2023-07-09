import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Brand from "../../assets/imgs/brand.svg";

import { BMCContext } from "../../providers/BMCProvider";

export default function Header() {
  const { me } = useContext(BMCContext);
  let history = useHistory();

  function handleLogout() {
    history.push("/login");
    localStorage.removeItem("access_token");
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={Brand}
              alt="Logotipo branco da Brasil Mais Conforme com fundo transparente"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/">
            Painel
          </Link>
          <Link className="nav-link" to="/questionarios">
            Questionários
          </Link>
          <Link className="nav-link" to="/perfil">
            Perfil
          </Link>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>{me?.name}</Navbar.Text>
          <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
