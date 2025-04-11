import { useRef, useState } from 'react';
import { menuWork } from '../../utilities/menu.Utilities';

function NewProject({ cancel, create }) {
    const inputValue = useRef(null);
    const [textColor, settextColor] = useState('green');
    const goodToGoo = useRef(true);

    return (
        <>
            <div onClick={(e) => {
                e.stopPropagation();
            }} className=" relative w-full min-w-[300px] ml-2 mr-2 max-w-[600px] bottom-4 p-3 flex  flex-col border border-blue-300 bg-blue-300 dark:bg-darkPanle
            text-darkPanle dark:text-blue-300 text-[1.5rem] rounded-md">

                <span className="">
                    Project Name
                </span>

                {/* The Input  */}
                <input style={{
                    color: textColor
                }} onChange={async (e) => {
                    inputValue.current = e.target.value;
                    let exists = await menuWork.handle.doesProjectExists(e.target.value ? e.target.value : "");
                    if (exists !== -1) {
                        if (exists) {

                            settextColor('red');
                            goodToGoo.current = false;
                        }
                        else {
                            settextColor('green');
                            goodToGoo.current = true;
                        }
                    } else {
                        console.error('Error at from doesProjectExists');
                    }

                }} className="w-full border-2 rounded-md
                 border-darkPanle  dark:border-blue-300
                mt-1 mb-1 p-1"
                    type="text"></input>

                {/* Button Section  */}
                <div className="flex flex-row justify-between m-2">

                    <button onClick={(e) => {

                        if (cancel) {
                            cancel(e);
                        }
                    }} className="p-1 pl-3 pr-3 ml-1 mr-1 border rounded-xl
                    active:bg-blue-200 active:text-screenModeButton">
                        Cancel
                    </button>

                    <button onClick={(e) => {
                        if (!goodToGoo.current) {
                            alert("Project with title - " + inputValue.current + ", Already Exists");
                        }
                        if (create && goodToGoo.current)
                            create(inputValue.current, e);
                    }} className="p-1 pl-3 pr-3 ml-1 mr-1 border  rounded-xl
                     active:bg-blue-200 active:text-screenModeButton">
                        Create
                    </button>

                </div>
            </div >
        </>
    );
}



export { NewProject }