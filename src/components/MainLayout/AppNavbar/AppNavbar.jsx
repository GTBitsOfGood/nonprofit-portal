import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
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
              <NavItem>
                <a
                  className={clsx(classes.appNavItem, classes.appNavButton)}
                  href={urls.pages.home}
                >
                  Back to Homepage
                </a>
              </NavItem>
            )}
            {isLoggedIn && (
              <>
                <NavItem>
                  <Link href={urls.pages.admin}>
                    <a className={classes.appNavItem}>Applications</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href={urls.pages.availability}>
                    <a className={classes.appNavItem}>Availability</a>
                  </Link>
                </NavItem>
              </>
            )}
            {isAdmin && (
              <NavItem>
                <Link href={urls.pages.register}>
                  <a className={classes.appNavItem}>Create User</a>
                </Link>
              </NavItem>
            )}
            {isLoggedIn ? (
              <NavItem>
                <a
                  className={clsx(classes.appNavItem, "right")}
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Logout
                </a>
              </NavItem>
            ) : (
              <NavItem>
                <Link href={urls.pages.login}>
                  <a className={classes.appNavItem}>Login</a>
                </Link>
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
