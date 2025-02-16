import { KeyFrameTry } from "./subComponents";
import "../../cssAnimations/rough.css";
import { DarkModeToogle } from "../navBar/navBar.darkModeButton";
import { SubPanelContent } from "../mainContainer/mainContainer.leftSpace.subPanelContents";
import { WhiteBoard } from "../whiteBoard/whiteBoard";




function Rough({ }) {
    return (
        <>

            <KeyFrameTry />
            <br></br>
            <hr></hr>
            <div className="flex flex-col justify-center items-center p-3">

                <WhiteBoard />
            </div>


        </>
    );
}



export { Rough }