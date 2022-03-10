import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { useUser, signOut } from "../../../actions/users";
import urls from "../../../utils/urls";
import classes from "./AppNavbar.module.css";

function AppNavbar() {
  const { user, mutateUser } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const handleLogout = async () => {
    mutateUser(await signOut());
  };

  const isLoggedIn = user != null && user.isLoggedIn;
  const isAdmin = user != null && user.isAdmin;

  return (
    <Navbar
      light
      expand="sm"
      className={clsx("mb-5", isLoggedIn && classes.appNavbar)}
    >
      <Container className={classes.navContainer}>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className={classes.appNavbarNav}>
            {!isLoggedIn && (
              <NavItem
                className={clsx(classes.appNavItem, classes.appNavButton)}
              >
                <NavLink href={urls.pages.home}>Back to Homepage</NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <>
                <NavItem className={classes.appNavItem}>
                  <NavLink href={urls.pages.admin}>Applications</NavLink>
                </NavItem>
                <NavItem className={classes.appNavItem}>
                  <NavLink href={urls.pages.availability}>Availability</NavLink>
                </NavItem>
              </>
            )}
            {isAdmin && (
              <NavItem className={classes.appNavItem}>
                <NavLink href={urls.pages.register}>Create User</NavLink>
              </NavItem>
            )}
            {isLoggedIn ? (
              <NavItem className={clsx(classes.appNavItem, "right")}>
                <NavLink
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              <NavItem className={classes.appNavItem}>
                <NavLink href={urls.pages.login}>Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
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
