import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Container, Nav, Navbar } from "react-bootstrap";

ReactDOM.render(
  <React.StrictMode>
     
  <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
            <Nav.Link href="/administrar">Administrar</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          </Container>
        </Navbar>
        <App />
  </>
      
  </React.StrictMode>,
  document.getElementById('root')
);

