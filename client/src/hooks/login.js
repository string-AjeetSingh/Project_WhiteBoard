import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import config from "../config";

function useLogin() {
    const auth0 = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const [userServerData, setUserServerData] = useState(null);
    const serverData = useRef(null);


    function login() {
        auth0.loginWithRedirect();
    }

    useEffect(() => {
        console.log("from login user : ", auth0.user);
    }, [auth0.user])

    function logout() {

        //request logout
        let serverUrl = config.serverUrl !== 0 ? config.serverUrl : window.location.origin;
        fetch(serverUrl + '/api/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((res) => {
                // alert("the response from request is :");
                // console.log("the response from request is : ", res);
                auth0.logout({ logoutParams: { returnTo: window.location.origin } });
            }).catch((err) => {
                console.error('error from login request : ', err);
            })

    }

    useEffect(() => {
        console.log('the auth0 form the hook : ', auth0);
        if (auth0.isAuthenticated && auth0.user) {

            //request login
            let serverUrl = config.serverUrl !== 0 ? config.serverUrl : window.location.origin;
            fetch(serverUrl + '/api/login', {
                method: 'POST',
                credentials: 'include', headers: {
                    'userdata': `{"email" : "${auth0.user ? auth0.user.email : null}"} `
                }
            })
                .then((res) => {
                    // console.log("the response from request is : ", res);
                    if (res.status === 401) {
                        logout();
                        return;
                    }
                    res.json()
                        .then((json) => {
                            if (json.status === 1 || json.status === 2) {
                                if (location.pathname === '/') {
                                    navigate('/menu');
                                }
                                setUserServerData({ ...json.data });
                                serverData.current = json.data;
                            } else {
                                throw new Error(' a problem with login ');
                            }
                        })


                }).catch((err) => {
                    console.error('error from login request : ', err);
                })

        }
        else {
            if (!auth0.isLoading)
                navigate('/');
        }
    }, [auth0.user, auth0.isAuthenticated])

    return { login, userServerData, serverData, logout, isAuthenticated: auth0.isAuthenticated, user: auth0.user, isLoading: auth0.isLoading }


}


export default useLogin;