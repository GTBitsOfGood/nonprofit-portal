import React from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { signOut } from "../../actions/users";
import config from "../../utils/urls";
import "./AppNavbar.css";

class AppNavbar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { user } = this.props;
    const { isOpen } = this.state;

    const isLoggedIn = user != null;
    const isAdmin = user != null && user.isAdmin;

    return (
      <Navbar
        light
        expand="sm"
        className={`mb-5${isLoggedIn ? " appNavbar" : ""}`}
      >
        <Container className="navContainer">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="appNavbarNav">
              {!isLoggedIn && (
                <>
                  <NavItem className="appNavItem appNavButton">
                    <NavLink href={config.pages.home}>Back to Homepage</NavLink>
                  </NavItem>
                </>
              )}
              {isLoggedIn && (
                <>
                  <NavItem className="appNavItem">
                    <NavLink href={config.pages.admin}>Applications</NavLink>
                  </NavItem>
                  <NavItem className="appNavItem">
                    <NavLink href={config.pages.availability}>
                      Availability
                    </NavLink>
                  </NavItem>
                </>
              )}
              {isAdmin && (
                <NavItem className="appNavItem">
                  <NavLink href={config.pages.register}>Create User</NavLink>
                </NavItem>
              )}
              {isLoggedIn ? (
                <NavItem className="appNavItem right">
                  <NavLink
                    onClick={signOut}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem className="appNavItem">
                  <NavLink href={config.pages.login}>Login</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

AppNavbar.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
};

AppNavbar.defaultProps = {
  user: null,
};

export default AppNavbar;
