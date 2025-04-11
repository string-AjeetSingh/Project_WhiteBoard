import { WebSocketServer } from "ws";
import config from "../../../config.js";
import cookie from 'cookie';
import signature from 'cookie-signature';
import jwt from "../jwt/jwt.js";
import project from "./projects.js"
import { clientError } from "../../globalFuntionalities/myLibraries/errorClasses.js";
import Utils from "../../globalFuntionalities/utils.js";



function activeSocket(server) {

    const socketServer = new WebSocketServer({ server });

    socketServer.on('connection', async (ws, req) => {
        console.log('socket connection enstablished');

        try {

            const theCookie = cookie.parse(req.headers.cookie || '');
            let raw = theCookie.theJWT;

            if (!raw || !raw.startsWith('s:'))
                throw new clientError("Invalid Cookie", 'cookie');

            const unsigned = signature.unsign(raw.slice(2), config.COOKIE_SECRET); // remove 's:' then verify

            if (!unsigned)
                throw new clientError("Invalid cookie signature", 'cookie-signature')

            let decoder = await jwt.jwtVerifyAsync(unsigned, config.COOKIE_SECRET);
            console.log('the user we found in web socket is  : ', decoder);

            ws.client = { ...decoder };
            ws.todo = new Map();
            ws.transId = 0;
            ws.getTransId = () => {
                return ws.transId += 1;
            }

            ws.send(JSON.stringify({ "email": decoder.email, status: 1, statusText: 'connection succesfull' }));


        } catch (error) {
            if (error instanceof clientError) {
                if (error.type === 'cookie')
                    // Invalid cookie
                    return ws.send(JSON.stringify(Utils.responseJsonTemplate(1, [-1, error.message])), () => {
                        ws.close();
                    })

                if (error.type === 'cookie-signature')
                    // Invalid cookie signature
                    return ws.send(JSON.stringify(Utils.responseJsonTemplate(1, [-2, error.message])), () => {
                        ws.close();
                    })

                console.error(error.message);

            } else {
                ws.close(null, "Unexpected Error at server ");
                console.error("Unexpected Error : ", error);
            }
        }





        ws.on("message", (message) => {

            try {

                //Expecting if used send m.saveData, to work with the transection
                /*
                
                Data we expecting is , jsonData = .data, .projectid, profile id we can get from the ws.client
                 */

                //Expecting if use send m.confirm to confirm the transection.

                //We send m.isConfirm m.transId for confirm.



                const jsonMessage = JSON.parse(message);
                console.log("the message from the client to socket : ", jsonMessage);
                debugger;

                if (jsonMessage.saveData) {
                    Utils.checkParameters([{ type: 'obj', path: 'jsonMessage.data', subject: jsonMessage },
                    { type: 'obj', path: 'jsonMessage.projectid', subject: jsonMessage }
                    ]);

                    let id = ws.getTransId();
                    ws.todo.set(id, { ...jsonMessage })
                    ws.send(JSON.stringify({ isConfirm: true, transId: id }));
                }

                else if (jsonMessage.confirm) {
                    Utils.checkParameters([{ type: 'obj', path: 'jsonMessage.confirm', subject: jsonMessage },
                    { type: 'obj', path: 'jsonMessage.transId', subject: jsonMessage }
                    ]);

                    let trans = ws.todo.get(jsonMessage.transId);
                    project.saveProject2(trans.data, trans.projectid, ws.client.profileid, ws);
                }

                else {
                    ws.send(JSON.stringify({ status: 1, message: "Nothing to work with" }));
                }

            } catch (error) {
                if (error instanceof clientError) {
                    ws.send(JSON.stringify(Utils.responseJsonTemplate(1, [-4, error.message])));
                    error.logit();
                }
                console.error(error);
            }
        });

        ws.on("close", () => {
            console.log("closing the socket connection");

        })
    })

}

export default {
    activeSocket: activeSocket
}