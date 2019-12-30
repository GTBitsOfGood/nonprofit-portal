import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import { signOut } from '../../actions/users';
import config from '../../../config';
import './AppNavbar.css';

const homeLink = 'https://bitsofgood.org/';
const aboutLink = 'https://bitsofgood.org/about-us';
const projectsLink = 'https://bitsofgood.org/projects';
const contactLink = 'https://www.facebook.com/GTBitsOfGood';

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
      <Navbar light expand="sm" className="mb-5 appNavbar">
        <Container>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="appNavbarNav">
              <NavItem className="appNavItem">
                <NavLink href={homeLink}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem className="appNavItem">
                <NavLink href={aboutLink}>
                  About Us
                </NavLink>
              </NavItem>
              <NavItem className="appNavItem">
                <NavLink href={projectsLink}>
                  Projects
                </NavLink>
              </NavItem>
              <NavItem className="appNavItem appNavLeft">
                <NavLink href={config.pages.application}>
                  Apply
                </NavLink>
              </NavItem>
              <NavItem className="appNavItem">
                <NavLink href={contactLink}>
                  Contact Us
                </NavLink>
              </NavItem>
              {(isLoggedIn) && (
              <>
                <NavItem className="appNavItem">
                  <NavLink href={config.pages.admin}>
                    Applications
                  </NavLink>
                </NavItem>
                <NavItem className="appNavItem">
                  <NavLink href={config.pages.availability}>
                    Availability
                  </NavLink>
                </NavItem>
              </>
              )}
              {(isAdmin) && (
                <NavItem className="appNavItem">
                  <NavLink href={config.pages.register}>
                    Create User
                  </NavLink>
                </NavItem>
              )}
              {(isLoggedIn) ? (
                <NavItem className="appNavItem">
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
                <NavItem className="appNavItem">
                  <NavLink href={config.pages.login}>
                    Login
                  </NavLink>
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
