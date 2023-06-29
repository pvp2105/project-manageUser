import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmailHeader } from "../reducers/userSlice";
import { useAppSelector } from "../stores/store";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Log out Success ");
    dispatch(getEmailHeader(""));
  };

  const { emailHeader } = useAppSelector((state) => state.userReducer);

  return (
    <header className="fixed-top container">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">EnetViet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/manageUsers" className="nav-link">
                Manage Users
              </NavLink>
            </Nav>
            <Nav>
              {emailHeader && (
                <div>
                  Hello
                  <b> {emailHeader}</b>
                </div>
              )}
            </Nav>
            <Nav>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {!emailHeader && (
                  <NavLink to="/login" className="dropdown-item">
                    Login
                  </NavLink>
                )}
                {emailHeader && (
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    LogOut
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
