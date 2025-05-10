

function prepareSimpleScroll(theRef) {
    //Thum size is fixed.
    let thumPercentage = theRef.thumbPercentage();

    theRef.thumbLength = (thumPercentage / 100) * theRef.totalLength;
    theRef.spaceToScroll = theRef.totalLength - theRef.thumbLength;

    theRef.scrollPerMovement = theRef.howMuchToScroll / theRef.spaceToScroll;
    adjustScrollByDifference(theRef);
}

function prepareDynamicScroll(theRef) {
    //Thum size changes, on the child and parent elem dimentions,
    //Things work dynamically.

    let thumPercentage = theRef.thumbPercentage();
    let initalThumbSize = (thumPercentage / 100) * theRef.totalLength;
    let scrollSpace = theRef.totalLength - initalThumbSize;

    let extraScroll = theRef.howMuchToScroll - scrollSpace;

    let perExtraPercentage = getPercentageValue(theRef.thumbPercentagePerExtra);
    if (perExtraPercentage === -1)
        throw new Error('❌ getPercentageValue return -1  ');

    let newThumbPercentage = thumPercentage - (perExtraPercentage * extraScroll);
    if (newThumbPercentage < 15)
        newThumbPercentage = 15;

    theRef.thumbLength = (newThumbPercentage / 100) * theRef.totalLength;
    theRef.spaceToScroll = theRef.totalLength - theRef.thumbLength;
    theRef.scrollPerMovement = theRef.howMuchToScroll / theRef.spaceToScroll;

    adjustScrollByDifference(theRef);

}

function adjustScrollByDifference(theRef) {
    if (!theRef.posDifference)
        return false;

    let scrollPos = theRef.posDifference / theRef.scrollPerMovement;
    theRef.initialPosition = scrollPos;
    console.log('the initial position of the scrollbar should be : ', scrollPos);
    return true;
}

function activeMovement(boolActive, saveMousePosition, currentMousePos, e) {
    e.preventDefault();

    if (boolActive.current) //if already active return;
        return;

    saveMousePosition.current.x = currentMousePos.current.x;
    saveMousePosition.current.y = currentMousePos.current.y;

    boolActive.current = true;
}

function moveScroll(boolActive, saveMousePlace, currentMousePosition, theRef, setScroll, setTranslation, type) {

    function scrollIt(diff, savedMouse, currentMouse, translationDiff = { x: null, y: null }) {
        let goingToScroll = theRef.scrolled + diff

        //prevent the scroll to not less than 0
        if (goingToScroll <= 0) {
            // console.log('✅ setting the scroll to zero');
            theRef.scrolled = 0;
            theRef.prevScrolled = 0;
            setScroll(0);
            if (type === 'hori') {
                translateByScrolling(theRef, setTranslation, { directValue: { x: theRef.posDifference } }, { useDirectValue: true });
            } else {
                translateByScrolling(theRef, setTranslation, { directValue: { y: theRef.posDifference } }, { useDirectValue: true });
            }
            resetSavedPosition(savedMouse, currentMouse);
            return;
        }

        //prevent the scroll to not more than maximum space
        if (goingToScroll >= theRef.spaceToScroll) {
            theRef.scrolled = theRef.spaceToScroll;
            theRef.prevScrolled = theRef.scrolled;
            setScroll(theRef.spaceToScroll);
            if (type === 'hori') {
                translateByScrolling(theRef, setTranslation, { directValue: { x: inverse((theRef.spaceToScroll - theRef.initialPosition) * theRef.scrollPerMovement) } }, { useDirectValue: true });
            } else {
                translateByScrolling(theRef, setTranslation, { directValue: { y: inverse((theRef.spaceToScroll - theRef.initialPosition) * theRef.scrollPerMovement) } }, { useDirectValue: true });
            }
            resetSavedPosition(savedMouse, currentMouse);
            return;
        }

        //console.log('The difference on scrolling is : ', diff);
        theRef.prevScrolled = goingToScroll;
        translateByScrolling(theRef, setTranslation, { diff: translationDiff });
        setScroll(goingToScroll);
    }

    function resetSavedPosition(savedMouse, currentMouse) {
        savedMouse.x = currentMouse.x;
        savedMouse.y = currentMouse.y;
    }

    if (!boolActive.current)
        return;

    let savedMouse = saveMousePlace.current;
    let currentMouse = currentMousePosition.current;

    let diff = {
        x: currentMouse.x - savedMouse.x,
        y: currentMouse.y - savedMouse.y,
    }

    if (type === 'hori') {
        scrollIt(diff.x, savedMouse, currentMouse, { x: diff.x * theRef.scrollPerMovement });
    } else {
        scrollIt(diff.y, savedMouse, currentMouse, { y: diff.y * theRef.scrollPerMovement });
    }

}

function deActiveMovement(boolActive, theRef) {
    if (!boolActive.current) //if already deActive return;
        return


    console.log("attempt to deActive the movement of scroll Bar ");
    theRef.current.scrolled = theRef.current.prevScrolled;
    theRef.current.tempTranslation.saveWork();
    boolActive.current = false;
}

function translateByScrolling(theRef, setTranslation, values = { diff: { x: null, y: null }, directValue: { x: null, y: null } }, options = { useDirectValue: false }) {

    if (!setTranslation)
        throw new Error('Please provide the setTranslation parameters to the functions ');

    if (!theRef)
        throw new Error('Please provide theRef parameters to the functions ');

    if (options.useDirectValue) {  //Update states values direct to the new values.

        if (!values?.directValue)
            throw new Error("please provide valid values to 'values' parameter")

        setTranslation((prev) => {
            let newValues = {};

            if (values.directValue.x)
                newValues.x = values.directValue.x;

            if (values.directValue.y)
                newValues.y = values.directValue.y;

            theRef.tempTranslation.transWork = newValues.x ? newValues.x : newValues.y;
            theRef.tempTranslation.saveWork();

            //console.log("the newValues to the translation by directValue : ", newValues);
            return { ...prev, ...newValues }
        })
    }
    else {   //Use the previous values to have the new values to the states

        if (!values?.diff)
            throw new Error("please provide valid values to 'values' parameter")

        setTranslation((prev) => {
            let newValues = {};

            if (values.diff.x)
                newValues.x = theRef.tempTranslation.trans + inverse(values.diff.x);

            if (values.diff.y)
                newValues.y = theRef.tempTranslation.trans + inverse(values.diff.y);

            theRef.tempTranslation.transWork = newValues.x ? newValues.x : newValues.y;

            //console.log("the newValues to the translation by !directValue : ", newValues);

            return { ...prev, ...newValues }
        })

    }
}
function inverse(val) {
    return -(val);
}

function useInitalPosition(setThumbPosition, theRef) {
    setThumbPosition(theRef.initialPosition);
    theRef.scrolled = theRef.initialPosition;
    theRef.prevScrolled = theRef.initialPosition;
}

function getPercentageValue(val) {
    //working fine,
    //Provide the string with % in it and get the value separated in float
    if (typeof (val) !== 'string')
        return -1;

    if (val.length <= 1)
        return -1;


    let index = val.indexOf('%');
    let theValue = val.slice(0, index);

    return parseFloat(theValue);
}

const scrollLogic = {
    activeMovement,
    deActiveMovement,
    moveScroll,
    useInitalPosition
}

export { prepareSimpleScroll, prepareDynamicScroll, getPercentageValue, scrollLogic }
