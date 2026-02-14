import React from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { FaProjectDiagram, FaGithub } from 'react-icons/fa';

const AppNavbar = () => {
    return (
        <Navbar expand="lg" variant="dark" className="glass-panel mb-4 mx-3 mt-3 py-3">
            <Container>
                <Navbar.Brand href="#" className="d-flex align-items-center fs-4">
                    <FaProjectDiagram className="me-2 text-info" />
                    <span className="fw-light">Social</span>
                    <span className="fw-bold text-info">Graph</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="#" className="text-light mx-2">Dashboard</Nav.Link>
                        <Nav.Link href="#" className="text-light mx-2">
                             System Status <Badge bg="success" className="ms-1">Online</Badge>
                        </Nav.Link>
                        <Nav.Link href="https://github.com" target="_blank" className="text-white">
                            <FaGithub size={20} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;