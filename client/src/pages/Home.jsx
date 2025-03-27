import ParticleCanvas from "../components/particleCanvas/particles2";
import SpecialButton from "../components/SpecialButtons/specialButtons";
import { CommonContext } from "../myLib/commonContext/myContext";
import { useContext, useEffect, useState } from "react";
import { useInnerWidthHeight } from "../hooks/InnerWidthHeight";
import useLogin from "../hooks/login";
import config from "./../config"

function Home({ }) {
    const [width, height] = useInnerWidthHeight();
    const { aCommunication } = useContext(CommonContext);
    const [screenMode, setScreenMode] = useState(null);
    const { login } = useLogin();

    function onChangeScreenMode(val) {  //no used
        setScreenMode(val);
    }

    useEffect(() => {

        if (aCommunication.current) {
            aCommunication.current.sendTo_Home = onChangeScreenMode;
        }
    }, [])
    return (
        <>
            <div className="">
                {/*<ParticleCanvas /><br />  */}

                <ParticleCanvas width={width} height={height} /><br />

                {width < 700 ?
                    <div className="flex flex-col absolute top-0 left-0 justify-center items-center w-screen  h-screen   ">

                        <SpecialButton onClick={login} theName={'Login'} />
                        <SpecialButton theName={'Guest'} />
                    </div>
                    :
                    <div className="flex flex-row absolute top-0 left-0 justify-center items-center w-screen  h-screen   ">

                        <SpecialButton onClick={login} theName={'Login'} />
                        <SpecialButton theName={'Guest'} />
                    </div>
                }

            </div>
        </>
    );
}


export { Home }