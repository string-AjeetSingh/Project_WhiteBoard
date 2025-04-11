import config from './../config.js'

let serverUrl = config.serverUrl !== 0 ? config.serverUrl : window.location.origin;

const menuWork = {
    handle: {
        activeHoverStyle(theRef) {
            modifyClass(theRef.current, 'add', { current: 'menu-button-mouseenter' });
        },
        deActiveHoverStyle(theRef) {
            modifyClass(theRef.current, 'remove', { current: 'menu-button-mouseenter' });
        },
        clickStyle(theRef, mode, callback, type) {
            if (mode === 'start') {
                if (containClass(theRef.current, 'menu-button.mouseenter')) {
                    modifyClass(theRef.current, 'replace', { current: 'menu-button-mousedown', old: 'menu-button-mouseenter' });
                } else {
                    theRef.current.classList.add("menu-button-mousedown");
                }

            } else if (mode === 'over') {

                if (containClass(theRef.current, 'menu-button-mousedown')) {
                    modifyClass(theRef.current, 'replace', { current: 'menu-button-mouseenter', old: 'menu-button-mousedown' })
                }
                if (callback) {
                    setTimeout(() => {
                        callback(type);
                    }, 100)
                } else {
                    console.error('provide callback to run on menubutton');
                }

            } else {
                console.error('please provide valid mode to the clickstyle');

            }

        },
        touchStyle(theRef, part1Ref, part2Ref, mode, callback, type, e) {

            if (mode === 'start') {
                modifyClass(theRef.current, 'add', { current: 'menu-button-touchstart' });
                modifyClass(part1Ref.current, 'add', { current: 'menu-part1-active' });
                modifyClass(part2Ref.current, 'add', { current: 'menu-part2-active' });

            } else if (mode === 'end') {
                e.preventDefault();
                modifyClass(theRef.current, 'remove', { current: 'menu-button-touchstart' });
                modifyClass(part1Ref.current, 'remove', { current: 'menu-part1-active' });
                modifyClass(part2Ref.current, 'remove', { current: 'menu-part2-active' });
                if (callback) {
                    setTimeout(() => {
                        callback(type);
                    }, 100)
                } else {
                    console.error('provide callback to run on menubutton');
                }
            }

        },

        cancelMenuOperation(setPanel, e) {
            e.stopPropagation();
            setPanel(0);
            console.log('from the blur panel');
        },
        async createMenuOperation(setPanel, projecttitle, e) {
            e.stopPropagation();

            let rsp = await fetch(serverUrl + "/api/createProject", {
                method: 'POST', headers: {
                    'projecttitle': projecttitle
                },
                credentials: 'include'
            });
            if (rsp) {
                let jsonData = await rsp.json();
                console.log("the response from the server is : ", jsonData);
                if (jsonData.status === 1) {
                    alert("succesfull created project with title - " + projecttitle);
                    setPanel(0);
                } else {
                    alert(jsonData.message);
                    setPanel(0);
                }
            }
        },
        doesProjectExists: async (title) => {

            let rsp = await fetch(serverUrl + '/api/ifProjectExists', {
                method: 'GET', headers: {
                    projecttitle: title
                }, credentials: "include"
            });
            if (rsp.status === 200) {
                let jsonData = await rsp.json();
                return jsonData.exists;
            }

            return -1;
        },
        fetchProjects: async (profileid) => {

            let rsp = await fetch(serverUrl + '/api/fetchAllProjects', {
                method: 'GET', headers: {
                    profileid: profileid
                }, credentials: "include"
            });
            if (rsp.status === 200) {
                let jsonData = await rsp.json();
                return jsonData.data;
            }
        },

        deleteProject: async (projectid) => {
            let rsp = await fetch(serverUrl + '/api/removeProject', {
                method: 'DELETE', headers: {
                    projectid: projectid
                }, credentials: "include"
            });
            if (rsp.status === 200) {
                let jsonData = await rsp.json();
                if (jsonData.status === 1) {
                    alert(jsonData.message);
                } else {
                    alert('problem deleting the project, see log');
                    console.error(jsonData.message)
                }
                //return jsonData.data;
            }
        }




    },
    otherFunctions: {

    }
}

function modifyClass(elem, mode, theClass = { old: null, current: null }) {
    if (mode === 'add') {
        elem.classList.add(theClass.current);
    }
    else if (mode === 'remove') {
        elem.classList.remove(theClass.current);
    }
    else if (mode === 'replace') {
        elem.classList.replace(theClass.old, theClass.current);
    }
}

function containClass(elem, className) {
    if (elem.classList.contains(className)) {
        return true;
    }
    return false;

}
export { menuWork }