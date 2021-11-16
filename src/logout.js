

import axios from 'axios';
import service from './services';

let accessToken = localStorage.accessToken
let userId = localStorage.userId;
const logout = () => (
    axios({
      method: 'GET',
      url: service.baseAPIURL + "login/Logout?userId=" + userId,
      headers: {
          'Authorization': 'Bearer ' + accessToken
      },
      }).then(response => {
        if(response.data.responseCode){
          window.location = "/";
          localStorage.clear();
        }
      })
      .catch(error => {
        window.location = "/";
        localStorage.clear();
          console.log(error);
      })
)


  export default logout;