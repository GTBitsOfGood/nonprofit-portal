import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import { signOut } from '../actions/users';

class AppNavbar extends Component {
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

    const isLoggedIn = user != null && user.loggedIn;
    const isAdmin = user != null && user.isAdmin;

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Bits of Good Nonprofit Portal</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/application">
                    Apply
                  </NavLink>
                </NavItem>
                {(isLoggedIn) && (
                  <>
                    <NavItem>
                      <NavLink href="/view">
                        Applications
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/schedule">
                        Availability
                      </NavLink>
                    </NavItem>
                  </>
                )}
                {(isAdmin) && (
                  <NavItem>
                    <NavLink href="/register">
                      Create User
                    </NavLink>
                  </NavItem>
                )}
                {(isLoggedIn) ? (
                  <NavItem>
                    <NavLink
                      onClick={signOut}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                ) : (
                  <NavItem>
                    <NavLink href="/login">
                      Login
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

export default AppNavbar;
