import { KeyFrameTry } from "./subComponents";
import { useRef, useEffect, useState } from "react";
import "../../cssAnimations/rough.css";
import { DarkModeToogle } from "../navBar/navBar.darkModeButton";
import { SubPanelContent } from "../mainContainer/mainContainer.leftSpace.subPanelContents";
import { addEvent, removeEvent } from "../../utilities/addRemoveEvent";

import ParticleCanvas from "../particleCanvas/particles2";
import SpecialButton from "../SpecialButtons/specialButtons";






function Rough({ }) {

    return (
        <>

            {/*<KeyFrameTry />  */}


            <div className="relative">
                {/*<ParticleCanvas /><br />  */}

                <ParticleCanvas /><br />
                <div className="flex flex-row absolute top-0 left-0 justify-center items-center w-screen  h-screen border-2 z-10 ">

                    <SpecialButton theName={'Login'} />
                    <SpecialButton theName={'Guest'} />
                </div>
            </div>
        </>
    );
}



export { Rough }