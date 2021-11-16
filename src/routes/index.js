import Login from '../views/login';
import BeerList from '../views/beers/beerList';

var routes = [
{
    path: "/login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth"
},
{
    path: "/Beers",
    name: "Beers",
    icon: "fa fa-beer text-primary",
    component: BeerList,
    layout: "/admin",
    routeType: 'main',
},{
    path: "/users",
    name: "Users",
    icon: "fa fa-users text-primary",
    component: null,
    layout: "/admin",
    routeType: 'main',
},
];
export default routes;