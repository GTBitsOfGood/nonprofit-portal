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

    const isLoggedIn = user != null && user.userId != null;

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
                  <NavItem>
                    <NavLink href="/view">
                      Applications
                    </NavLink>
                  </NavItem>
                )}
                {(!isLoggedIn) && (
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
    username: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

export default AppNavbar;
