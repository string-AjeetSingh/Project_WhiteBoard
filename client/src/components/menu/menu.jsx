import { MenuButton } from "./menu.Button";
import "./../../cssAnimations/menu.css"
import { BlurPanel } from "./menu.others";
import { menuWork } from "../../utilities/menu.Utilities";
import { useEffect, useState } from "react";
import { effectEventClass } from "../../myLib/effectEventClass";
import { NewProject } from "./menu.NewProject";
import { OpenProject } from "./menu.OpenProject";
import { useInnerWidthHeight } from "../../hooks/InnerWidthHeight";
import { useAuth0 } from "@auth0/auth0-react";


function Menu({ }) {
    const [boolBlurPanel, setBlurPanel] = useState(0);
    const [width, height] = useInnerWidthHeight();
    const { user } = useAuth0();


    useEffect(() => {
        console.log('ther user we found is  : ', user);

    }, [user])
    const bindedFunction = {
        cancelMenuOperation: menuWork.handle.cancelMenuOperation.bind(null, setBlurPanel)
    }

    const [blurPanelContent, setBlurPanelContent] =
        useState(null);

    function handleButtonClick(type) {
        if (type === 'new') {
            setBlurPanelContent(<NewProject key={1} cancel={bindedFunction.cancelMenuOperation} />);
        } else if (type === 'open') {
            setBlurPanelContent(<OpenProject cancel={bindedFunction.cancelMenuOperation} />);
        }
        setBlurPanel(1);
    }


    return (
        <>
            <div className=" overflow-hidden flex flex-col p-2 dark:bg-darkPanle
             bg-lightPanle items-center h-full relative ">
                <MenuButton type={'new'} onClick={handleButtonClick} firstWord={'N'} otherFollowingWord={"ew"} src={'/icons/newProject.png'}></MenuButton>
                <MenuButton type={'open'} onClick={handleButtonClick} firstWord={'O'} otherFollowingWord={"pen"} specialOne
                    src={'/icons/openProject.png'}></MenuButton>
                {boolBlurPanel ? <BlurPanel height={height} onClick={bindedFunction.cancelMenuOperation}>{blurPanelContent}  </BlurPanel> : null}

            </div>
        </>
    );
}


export { Menu }