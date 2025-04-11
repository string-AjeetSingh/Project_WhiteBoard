import { MenuButton } from "./menu.Button";
import "./../../cssAnimations/menu.css"
import { BlurPanel } from "./menu.others";
import { menuWork } from "../../utilities/menu.Utilities";
import { useEffect, useState, useContext } from "react";
import { effectEventClass } from "../../myLib/effectEventClass";
import { NewProject } from "./menu.NewProject";
import { OpenProject } from "./menu.OpenProject";
import { useInnerWidthHeight } from "../../hooks/InnerWidthHeight";
import useLogin from "../../hooks/login";
import { CommonContext } from "../../myLib/commonContext/myContext";



function Menu({ }) {
    const [boolBlurPanel, setBlurPanel] = useState(0);
    const [width, height] = useInnerWidthHeight();
    const { user, userServerData, serverData } = useLogin();
    const { aCommunication } = useContext(CommonContext);




    const bindedFunction = {
        cancelMenuOperation: menuWork.handle.cancelMenuOperation.bind(null, setBlurPanel)
    }

    const [blurPanelContent, setBlurPanelContent] =
        useState(null);

    function handleButtonClick(type) {
        if (type === 'new') {
            setBlurPanelContent(<NewProject key={1} create={create} cancel={bindedFunction.cancelMenuOperation} />);
        } else if (type === 'open') {
            setBlurPanelContent(<OpenProject userData={serverData} cancel={bindedFunction.cancelMenuOperation} />);
        }
        setBlurPanel(1);
    }

    function handleDarkMode(mode) {


    }

    function create(title, e) {
        if (title?.length > 0)
            menuWork.handle.createMenuOperation(setBlurPanel, title, e);

        else
            alert("please provide name to create project");
    }


    useEffect(() => {
        console.log('ther user we found is  : ', user);

    }, [user]);

    useEffect(() => {
        if (aCommunication.current) {
            aCommunication.current.sendTo_Menu = handleDarkMode;
        }
    }, [])


    return (
        <>
            <div className=" overflow-hidden flex flex-col p-2 dark:bg-darkPanle
             bg-lightPanle items-center h-full relative ">
                {userServerData ?
                    <>
                        <MenuButton type={'new'} onClick={handleButtonClick} firstWord={'N'} otherFollowingWord={"ew"} src={'/icons/newProject.png'}></MenuButton>
                        <MenuButton type={'open'} onClick={handleButtonClick} firstWord={'O'} otherFollowingWord={"pen"} specialOne
                            src={'/icons/openProject.png'}></MenuButton>
                        {boolBlurPanel ? <BlurPanel height={height} onClick={bindedFunction.cancelMenuOperation}>{blurPanelContent}  </BlurPanel> : null}
                    </>

                    :
                    <div className="  text-screenModeButton
             dark:text-blue-300 text-4xl flex flex-row justify-center items-center  relative font-bold grow-1   "> <span>Loading please wait ...</span></div>
                }


            </div>
        </>
    );
}


export { Menu }