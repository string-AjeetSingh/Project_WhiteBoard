import { KeyFrameTry } from "./subComponents";
import "../../cssAnimations/rough.css";
import { DarkModeToogle } from "../navBar/navBar.darkModeButton";
import { SubPanelContent } from "../mainContainer/mainContainer.leftSpace.subPanelContents";




function Rough({ }) {
    return (
        <>

            <KeyFrameTry />
            <br></br>
            <hr></hr>
            <DarkModeToogle />
            <br></br>
            <hr></hr>
            <SubPanelContent index={1} />

        </>
    );
}



export { Rough }