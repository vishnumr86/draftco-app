import React from 'react';
import { HashRouter, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
// import ProtectedRoute from './routes/protected.route';

import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';



const App = () => {

let accessToken = localStorage.accessToken
    return (
        <HashRouter>
            <div>
                <Switch>
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                        {/* <ProtectedRoute path="/Dashboard" component={Dashboard} /> */}
                        <Redirect from="/" to="/auth/login" />
                </Switch>
            </div>
        </HashRouter>
    );
};

export default App;
