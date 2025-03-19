import { MenuButton } from "./menu.Button";
import "./../../cssAnimations/menu.css"
import { BlurPanel } from "./menu.others";
import { menuWork } from "../../utilities/menu.Utilities";
import { useEffect, useState } from "react";
import { effectEventClass } from "../../myLib/effectEventClass";
import { NewProject } from "./menu.NewProject";


function Menu({ }) {
    const [boolBlurPanel, setBlurPanel] = useState(0);


    const bindedFunction = {
        cancelMenuOperation: menuWork.handle.cancelMenuOperation.bind(null, setBlurPanel)
    }

    const [blurPanelContent, setBlurPanelContent] = useState(<NewProject cancel={bindedFunction.cancelMenuOperation} />);

    function handleButtonClick() {
        setBlurPanel(1);
    }


    return (
        <>
            <div className=" overflow-hidden flex flex-col p-2 dark:bg-darkPanle bg-lightPanle items-center h-full ">
                <MenuButton onClick={handleButtonClick} firstWord={'N'} otherFollowingWord={"ew"} src={'/icons/newProject.png'}></MenuButton>
                <MenuButton onClick={handleButtonClick} firstWord={'O'} otherFollowingWord={"pen"} specialOne
                    src={'/icons/openProject.png'}></MenuButton>
                {boolBlurPanel ? <BlurPanel onClick={bindedFunction.cancelMenuOperation}>{blurPanelContent}  </BlurPanel> : null}

            </div>
        </>
    );
}


export { Menu }