import "../../cssAnimations/mainContainer.css";
import { LeftSpace } from "./mainContainer.leftSpace";
import { RightSpace } from "./mainContainer.rightSpace";
import { CommonContext } from "../../myLib/commonContext/myContext";
import { useRef, useContext } from "react";


function MainContainer({ }) {
    const selectedShape = useRef(null);
    const selectedItem = useRef({});

    const { trackEvent, eventDetail, aCommunication } = useContext(CommonContext);
    return (
        <>
            <CommonContext.Provider value={{ trackEvent, eventDetail, selectedItem, aCommunication }}>
                <LeftSpace />
                <RightSpace />
            </CommonContext.Provider>

        </>
    );
}


export { MainContainer };