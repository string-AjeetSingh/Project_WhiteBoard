import { useRef, useState, useEffect, useContext } from 'react';
import { CommonContext } from '../myLib/commonContext/myContext';
import config from '../config';


//Using common context.

//Core idea
/* 
-- Start the connection when a flag is started, on time connection start,
 after that connection sustain untill close the application.

 -- After any edit mark the flag then, the hook does its work then, reset the mark.

 -- On mark , Time out created for 1 sec, after that the data saved and mark should reset or next time.
*/


function useSaveData() {
    const { aCommunication } = useContext(CommonContext);
    const interval = useRef(null);
    const socket = useRef(null);
    const onTime = useRef(false);
    const markSave = useRef(false);
    function runOneTime(callback) {
        if (!onTime.current) {
            callback();
            onTime.current = true;
        }
    }

    function saveData() {

        socket.current.send(JSON.stringify({ data: aCommunication.current.whiteboardData.data, saveData: true, projectid: aCommunication.current.whiteBoardServerData.data.projectid }));

        //After save Data, resolve the markSave
        aCommunication.current.markSave.current = false;
    }

    function confirmTransection(transId) {

        socket.current.send(JSON.stringify({ confirm: true, transId: transId }));
    }

    function setWsConnection() {

        socket.current = new WebSocket(config.socketUrl);
        socket.current.onopen = () => {
            console.log("the socket is conneted to save Data");
        }

        socket.current.onmessage = (event) => {
            socket.recentMessage = JSON.parse(event.data);

            if (socket.recentMessage.isConfirm) {
                confirmTransection(socket.recentMessage.transId);
            }
            console.log("the socket is listening the messages from the server, the message recently is : ", socket.recentMessage);
        }


        socket.current.onclose = () => {
            console.log("the socket is closing for the save data ");
        }
    }

    function intervalToSave() {
        let timeout = false;
        interval.current = setInterval(() => {
            if (aCommunication.current.markSave.current) {
                runOneTime(setWsConnection);
                if (!timeout) {
                    setTimeout(() => {
                        timeout = false;
                        saveData(aCommunication.current.whiteboardData.data);
                    }, 1000);

                    timeout = true;
                }

            }
        }, 0);
    }

    function cancelInterval() {

        clearInterval(interval.current);
    }

    useEffect(() => {
        aCommunication.current.markSave = markSave;
        intervalToSave();

        return (() => {
            if (interval.current) {
                cancelInterval();
            }
        })
    }, []);
}






export default useSaveData;