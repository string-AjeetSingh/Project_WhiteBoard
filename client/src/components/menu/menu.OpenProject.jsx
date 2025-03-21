


function AContainer({ }) {    //A option container, can be use to show the project name and img
    return (
        <>
            <button className=" relative w-full flex flex-col h-[150px]  overflow-hidden
             mt-1 mb-1 bg-blue-300 dark:bg-lightPanle  text-darkPanle
             dark:text-blue-100  rounded-md">
                <span className="text-[1.2rem] m-2 ">Project Name</span>
                <div className=" absolute w-full  h-[150px] rounded-xl border border-amber-500 ">

                </div>
            </button>
        </>
    );
}

function OpenProject({ }) {
    return (
        <>
            <div className="flex flex-col items-center self-start text-screenModeButton
             dark:text-blue-300  w-full h-full ">
                <span className="text-3xl m-1 ">Select Project</span>

                <div onClick={(e) => {
                    e.stopPropagation();
                }}
                    className="overflow-y-auto w-full pt-0  p-3  ">
                    <AContainer />
                    <AContainer />
                    <AContainer />
                    <AContainer />
                    <AContainer />
                </div>
            </div>
        </>
    );
}


export { OpenProject }