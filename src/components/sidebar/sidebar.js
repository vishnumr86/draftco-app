import React from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

import {
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
} from "reactstrap";

class Sidebar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: true
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {

    this.setState({
      collapseOpen: !this.state.collapseOpen
    });

    document.body.classList.toggle("sidebar-hidden");
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.layout !== "/auth" && prop.routeType !== 'sub') {
      return (
        <NavItem key={key}>
          <NavLink
            to={ prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active" >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
      }
    });
  };
  render() {
    const { routes, logo } = this.props;
    const {collapseOpen} = this.state
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          <div>
          <div className="top-nav">
          {logo ? (
            <NavbarBrand className="pt-0 pb-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src="http://dev.k2btech.com/Services/Uploads/default.png"
              />
            </NavbarBrand>
          ) : null}
        <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
          {  collapseOpen ?  <i className="fas fa-align-right"></i> :  <i className="fas fa-align-justify"></i>}
           
          </button>
        </div>
          <div navbar="true" className="mt-5">
          <Nav navbar>{this.createLinks(routes)}</Nav>
          </div>
          </div>
          
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
 