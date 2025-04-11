import { NavBar } from "../components/navBar/navBar.jsx";
import { useParams } from "react-router-dom";
import { MainContainer } from "../components/mainContainer/mainContainer.jsx";
import { CommonContext } from "../myLib/commonContext/myContext.js"
import { useEventTracker } from "../hooks/eventTraker.js";
import { useEffect, useRef, useContext } from 'react'
import config from "../config.js";



function Workspace({ }) {

    const { projectid } = useParams();
    const { aCommunication } = useContext(CommonContext);

    async function socketProject() {
        let ws = new WebSocket(config.socketUrl);
        ws.onopen = () => {
            console.log("succesfully open the client to server socket");
            ws.send(JSON.stringify({ "data": "helo" }));
        };

        ws.onmessage = (event) => {
            console.log("message from the server is : ", event.data);
        }

        ws.onclose = () => {
            console.log('the socket connections is closed');
        }




    }
    async function fetchProject() {

        let serverUrl = config.serverUrl !== 0 ? config.serverUrl : window.location.origin;
        fetch(serverUrl + '/api/fetchProject', {
            method: "GET", headers: {
                projectid: projectid
            },
            credentials: 'include'
        })
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((jsonData) => {
                        if (jsonData.status === 1) {
                            //  alert(jsonData.message);
                            aCommunication.current.whiteBoardServerData = {
                                ready: true,
                                data: jsonData.data
                            }
                            console.log("the project data is : ", jsonData);
                        } else {
                            //Fetch not success
                            console.error(jsonData.message);
                        }
                    })
                }
            })
    }

    useEffect(() => {
        if (projectid) {
            fetchProject();
            //
        }

        return (() => {
            if (aCommunication.current.whiteboardData?.data)
                aCommunication.current.whiteboardData.data = null;

            if (aCommunication.current.whiteBoardServerData)
                aCommunication.current.whiteBoardServerData = null;

        })
    }, [])
    return (
        <>
            <main className="grow pb-2 
            flex flex-row  bg-lightPanle dark:bg-darkPanle 
            ">
                <MainContainer />
            </main>
        </>
    );
}



export { Workspace }