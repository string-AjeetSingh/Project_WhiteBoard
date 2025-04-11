import { useEffect, useState, useContext } from "react";
import { menuWork } from "../../utilities/menu.Utilities";
import useScreenMode from './../../hooks/screenMode'
import { useNavigate } from "react-router-dom";

function AContainer({ projectData, refreshProjects }) {    //A option container, can be use to show the project name and img
    const [screenMode] = useScreenMode();
    const [deleteIcon, setdeleteIcon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (screenMode) {
            if (screenMode === 'dark')
                setdeleteIcon('./icons/deleteIconLight1.png');

            else if (screenMode === 'light')
                setdeleteIcon('./icons/deleteIconDark1.png');
        }
    }, [screenMode])
    return (
        <>
            <button onClick={(e) => {
                //Open Project
                navigate('/workspace/' + projectData.projectid);
            }} className=" relative w-full min-w-[340px] max-w-[500px] flex flex-col h-[150px]  overflow-hidden
             mt-2 mb-2 bg-blue-300 dark:bg-lightPanle  text-darkPanle
             dark:text-blue-100  rounded-md">
                <span className="text-[1.2rem] m-2 ">{projectData.projectTitle}</span>
                <div className=" absolute w-full  h-[150px] rounded-xl border border-amber-500 ">

                </div>
                <button onClick={async (e) => {
                    //Delete Project
                    e.stopPropagation();
                    await menuWork.handle.deleteProject(projectData.projectid);
                    refreshProjects();
                }} className="size-10 absolute right-1 m-1 bottom-1 p-1
                active:scale-90
                dark:active:bg-lightPanle active:bg-whiteBoard-one
                 bg-lightPanle dark:bg-screenModeButton rounded-md">
                    <img className="w-full" src={deleteIcon}></img>
                </button>
            </button>
        </>
    );
}

function OpenProject({ userData }) {

    const [projects, setprojects] = useState(null);

    function refreshProjects() {
        menuWork.handle.fetchProjects(userData.current.profileid)
            .then((data) => {
                // console.log("the projects user have are : ", data);
                setprojects(data);
            })
    }

    useEffect(() => {
        if (userData) {
            refreshProjects();

        }
        //   console.log("from open project panel", userData);
    }, [userData])
    return (
        <>
            <div className="flex flex-col items-center self-start text-screenModeButton
             dark:text-blue-300  w-full h-full ">
                <span className="text-2xl font-bold m-4 ">Select Project</span>

                <div onClick={(e) => {
                    e.stopPropagation();
                }}
                    className="overflow-y-auto w-full pt-0  p-3 flex flex-col items-center  ">

                    {projects ? projects.map((item) => {
                        return <AContainer refreshProjects={refreshProjects} projectData={item} />
                    }) : <div className=" text-4xl text-center  relative font-bold "> Loading Projects ...</div>}
                </div>
            </div>
        </>
    );
}


export { OpenProject }