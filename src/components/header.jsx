import React from "react";
import { Navbar, Nav, NavItem } from 'react-bootstrap';


function Header() {

    return (
        <header className="fixed-top container">

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav>
                        <NavItem>
                            <Nav.Link href="#" active>Home</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link href="#">Features</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link href="#">Pricing</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link href="#" disabled>Disabled</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;
