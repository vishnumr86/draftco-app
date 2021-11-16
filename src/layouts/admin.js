import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import routes from "../routes/index";
import Sidebar from "../components/sidebar/sidebar";
import AdminHeader from "../components/header/adminHeader";
import PageNotFound from "../views/error/PageNotFound";
import Unauthorized from "../views/error/Unathorized";
import BadRequest from "../views/error/BadRequest";
import InternalServerError from "../views/error/InternalServerError";

class Admin extends React.Component {
  constructor() {
    super();
    this.collapsibleSideBar = this.collapsibleSideBar.bind(this);
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      let pathname = routes[i].layout + routes[i].path;
      if (path === pathname) {
        return routes[i].name;
      }
    }
    return "Draftco";
  };
  collapsibleSideBar = () => {
    console.log("hi");
  };
  render() {
    return (
      <div>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/beers",
            imgSrc: require("../assets/img/brand/aims_main.png"),
            imgAlt: "...",
          }}
          collapsibleSideBar={this.collapsibleSideBar}
        />
        <div className="main-content">
          <AdminHeader
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <div className="header bg-primary py-1 py-lg-5">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center ">
                  <Col lg="5" md="6"></Col>
                </Row>
              </div>
            </Container>
          </div>
                <Container fluid className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Col lg="12" md="12">
                            <Switch>
                                {this.getRoutes(routes)}
                                <Route component={PageNotFound} exact path="/admin/pagenotfound" key="pagenotfound" />
                                <Route component={Unauthorized} exact path="/admin/unauthorized" key="unauthorized" />
                                <Route component={BadRequest} exact path="/admin/badrequest" key="badrequest" />
                                <Route component={InternalServerError} exact path="/admin/internalservererror" key="internalservererror" />
                            </Switch>
                           
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Admin;
