import { useEffect, useRef, useState } from 'react';
import config from '../../config';

function InputBox({ spanName, outValue }) {

    return (
        <>
            <div className='m-1'>

                <span>{spanName} : </span>
                <input onChange={(e) => {
                    if (outValue)
                        outValue(e.target.value);
                }} className=' border border-amber-50 p-1 rounded-md' type='text'></input>
            </div>
        </>
    );
}

function Button({ name, onClick }) {
    return (
        <>
            <button onClick={onClick} className='w-fit p-1 m-1 rounded-md pr-3 pl-3 bg-sky-400 active:bg-sky-700 '>
                {name}
            </button>
        </>
    );
}

function TrySocket({ }) {

    const socket = useRef(null);
    const inputRef = useRef({ message: '' });
    const transId = useRef([]);

    function outMessage(val) {
        inputRef.current.message = val;
    }

    function sendMessage() {
        socket.current.send(JSON.stringify({ message: inputRef.current.message, saveData: true, data: [], projectid: 5 }));
    }

    function confirm(transId) {
        socket.current.send(JSON.stringify({ confirm: true, transId: transId }));
    }

    function connectSocket() {
        socket.current = new WebSocket(config.socketUrl);

        socket.current.onopen = () => {
            console.log('socket connection established')
        }

        socket.current.onmessage = (event) => {
            let fromServer = JSON.parse(event.data)
            if (fromServer.isConfirm) {
                console.log("server waiting form the confirmation with : ", fromServer);
                console.log("Providing confirmation ...");
                confirm(fromServer.transId);
            } else {
                console.log("message from the server is : ", fromServer);

            }


        }
        socket.current.onclose = () => {
            console.log('socket connection closing ');
        }



    }

    useEffect(() => {
        connectSocket();
    }, [])
    return (
        <>
            <h2>Try sockets</h2>
            <div className=' text-2xl p-1 flex flex-col '>
                <InputBox outValue={outMessage} spanName={"Message"} />
                <InputBox spanName={"OTher Message"} />

                <Button onClick={sendMessage} name={"Send"} />
                <Button onClick={connectSocket} name={"Retry Connection"} />

            </div>
        </>
    );
}


export default TrySocket;