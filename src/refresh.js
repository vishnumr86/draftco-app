
import axios from 'axios';
import service from './services';

const AccessTokenVal = localStorage.accessToken;
const RefreshTokenVal = localStorage.refreshToken;
const userId = localStorage.userId;

 const refreshToken = () => {
    return(
        axios({
            method: 'POST',
            url: service.baseAPIURL + 'login/refreshtoken',
            data:{
                "AccessToken": AccessTokenVal,
                "RefreshToken": RefreshTokenVal
            }
        }).then(response => {
            if(response.data.result != null){
                let newAccessToken = response.data.result.accessToken,
                    newRefreshToken = response.data.result.refreshToken

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken)
            }
                
        })
        .catch(error => {
            console.log("error: " + error)
        })

    )
}

export default refreshToken;
