/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import logout from '../../logout';
import service from '../../services';

class AdminNavbar extends React.Component {
  constructor(){
    super();
    this.state = {
     userName : null,
      profilePic: null
    }
  }
  componentDidMount = () => {
    let userDetails = JSON.parse(localStorage.userDetails)
    let userName = userDetails.name
    let profilePic = userDetails.avatar

    this.setState({
      userName,
      profilePic: service.baseImgURL + "default.png"
    })
  }
  render() {
    const {userName, profilePic} = this.state
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <div className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {" "}
              {this.props.brandText}{" "}
            </div>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={profilePic}
                      />{" "}
                    </span>{" "}
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                       {userName}{" "}
                      </span>{" "}
                    </Media>{" "}
                  </Media>{" "}
                </DropdownToggle>{" "}
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0"> Welcome! </h6>{" "}
                  </DropdownItem>{" "}
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span> My profile </span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span> Settings </span>{" "}
                  </DropdownItem>{" "}
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span> Activity </span>{" "}
                  </DropdownItem>{" "}
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span> Support </span>{" "}
                  </DropdownItem>{" "}
                  <DropdownItem divider /> */}
                  <DropdownItem onClick={logout}>
                    <i className="ni ni-user-run" />
                    <span> Logout </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
