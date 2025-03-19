

const menuWork = {
    handle: {
        activeHoverStyle(theRef) {
            modifyClass(theRef.current, 'add', { current: 'menu-button-mouseenter' });
        },
        deActiveHoverStyle(theRef) {
            modifyClass(theRef.current, 'remove', { current: 'menu-button-mouseenter' });
        },
        clickStyle(theRef, mode, callback) {
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
                setTimeout(() => {
                    callback();
                }, 100)

            } else {
                console.error('please provide valid mode to the clickstyle');

            }

        },
        touchStyle(theRef, part1Ref, part2Ref, mode, callback, e) {

            if (mode === 'start') {
                modifyClass(theRef.current, 'add', { current: 'menu-button-touchstart' });
                modifyClass(part1Ref.current, 'add', { current: 'menu-part1-active' });
                modifyClass(part2Ref.current, 'add', { current: 'menu-part2-active' });

            } else if (mode === 'end') {
                e.preventDefault();
                modifyClass(theRef.current, 'remove', { current: 'menu-button-touchstart' });
                modifyClass(part1Ref.current, 'remove', { current: 'menu-part1-active' });
                modifyClass(part2Ref.current, 'remove', { current: 'menu-part2-active' });
                setTimeout(() => {
                    callback();
                }, 100)
            }

        },

        cancelMenuOperation(setPanel, e) {
            e.stopPropagation();
            setPanel(0);
            console.log('from the blur panel');
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