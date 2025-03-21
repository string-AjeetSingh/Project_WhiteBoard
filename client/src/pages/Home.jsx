import ParticleCanvas from "../components/particleCanvas/particles2";
import SpecialButton from "../components/SpecialButtons/specialButtons";
import { CommonContext } from "../myLib/commonContext/myContext";
import { useContext, useEffect, useState } from "react";
import { useInnerWidthHeight } from "../hooks/InnerWidthHeight";
import { useAuth0 } from "@auth0/auth0-react";

function Home({ }) {
    const [width, height] = useInnerWidthHeight();
    const { aCommunication } = useContext(CommonContext);
    const [screenMode, setScreenMode] = useState(null);
    const { loginWithRedirect, user } = useAuth0();

    function onChangeScreenMode(val) {  //no used
        setScreenMode(val);
    }

    function login() {
        loginWithRedirect();
    }


    useEffect(() => {
        console.log('the user is : ', user);

    }, [user])

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

                {width < 500 ?
                    <div className="flex flex-col absolute top-0 left-0 justify-center items-center w-screen  h-screen   ">

                        <SpecialButton onClick={login} theName={'Login'} />
                        <SpecialButton theName={'Guest'} />
                    </div>
                    :
                    <div className="flex flex-row absolute top-0 left-0 justify-center items-center w-screen  h-screen   ">

                        <SpecialButton onClick={login} theName={'Login'} />
                        <SpecialButton theName={'Logout'} />
                    </div>
                }

            </div>
        </>
    );
}


export { Home }