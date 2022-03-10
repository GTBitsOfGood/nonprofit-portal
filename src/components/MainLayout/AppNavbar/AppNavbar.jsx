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
                <NavLink className="nav-link" href={urls.pages.home}>
                  Back to Homepage
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <>
                <NavItem className={classes.appNavItem}>
                  <NavLink
                    className="nav-link"
                    href={urls.pages.admin}
                    tag={Link}
                  >
                    Applications
                  </NavLink>
                </NavItem>
                <NavItem className={classes.appNavItem}>
                  <NavLink
                    className="nav-link"
                    href={urls.pages.availability}
                    tag={Link}
                  >
                    Availability
                  </NavLink>
                </NavItem>
              </>
            )}
            {isAdmin && (
              <NavItem className={classes.appNavItem}>
                <NavLink
                  className="nav-link"
                  href={urls.pages.register}
                  tag={Link}
                >
                  Create User
                </NavLink>
              </NavItem>
            )}
            {isLoggedIn ? (
              <NavItem className={clsx(classes.appNavItem, "right")}>
                <NavLink
                  className="nav-link"
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
                <NavLink
                  className="nav-link"
                  href={urls.pages.login}
                  tag={Link}
                >
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
