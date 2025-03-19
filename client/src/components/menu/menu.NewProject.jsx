import { useRef } from 'react';

function NewProject({ cancel }) {
    const inputValue = useRef(null);

    return (
        <>
            <div onClick={(e) => {
                e.stopPropagation();
            }} className=" p-3 flex  flex-col border border-blue-300 bg-blue-300 dark:bg-darkPanle
            text-darkPanle dark:text-blue-300 text-[1.5rem] rounded-md">

                <span className="">
                    Project Name
                </span>

                {/* The Input  */}
                <input onChange={(e) => {
                    inputValue.current = e.target.value;
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

                    <button onClick={() => {
                        alert(inputValue.current);
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