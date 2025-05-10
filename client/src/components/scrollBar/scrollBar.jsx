import { useState, useRef, useEffect } from 'react';
import useBoundingRect from '../../hooks/boundingRect';
import { prepareSimpleScroll, getPercentageValue, prepareDynamicScroll, scrollLogic } from '../../utilities/scrollBar';
import { effectEventClass } from '../../myLib/effectEventClass';
import { useMouseMovement } from '../../hooks/mousePointerMove';

function Thumb({ type = 'hori', length, position, activeScrollMovement }) {
    const [style, setStyle] = useState(null);
    const eventSet = useRef(false);
    const thumb = useRef(null);

    useEffect(() => {
        let breath = '90%';

        if (type === 'hori') {
            let newStyle = {
                height: breath,
                width: length ? length + 'px' : null,
            }
            setStyle({ ...newStyle });
        }
        else {
            let newStyle = {
                width: breath,
                height: length ? length + 'px' : null
            }
            setStyle({ ...newStyle });
        }
    }, [type, length])

    useEffect(() => {
        if (!type)
            return;

        if (type === 'hori') {
            setStyle((prev) => { return { ...prev, left: position ? position : 0 + 'px' } })

        } else {
            setStyle((prev) => { return { ...prev, top: position ? position : 0 + 'px' } })
        }
    }, [position])

    useEffect(() => {
        if (!activeScrollMovement)
            return;

        if (eventSet.current)
            return;

        const events = new effectEventClass();
        events.setEvent(thumb, 'mousedown', activeScrollMovement);

        eventSet.current = true;

        return (() => {
            events.returnEvents();
            eventSet.current = false;
        })
    }, [activeScrollMovement])

    return (
        <>
            <div ref={thumb} style={style} className='relative rounded-md bg-amber-400'>

            </div>
        </>
    );
}


function Bar({ type = 'hori', toScroll, positionDifference, setTranslation }) {


    const barData = useRef(null);
    const [style, setStyle] = useState(null);
    const [thumbLength, setThumbLength] = useState(50);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [mouseMove, mouseMoveRef] = useMouseMovement(null);
    const boolActiveScrolling = useRef(false);
    const previousMousePoint = useRef({ x: null, y: null });
    const boundedFunctions = useRef(null);
    let barPadding = 2;

    const barElem = useRef(null);


    //Here we calculate the inintals for the bar and the other things
    useEffect(() => {

        //  console.log('the ToScroll is : ', toScroll, 'with type : ', type);
        if (!barElem.current) {
            console.error('Please set barElem');
            return;
        }
        if (!toScroll || !positionDifference)
            return;

        let barClientLength = null;

        if (type === 'verti')
            barClientLength = barElem.current.clientHeight;
        if (type === 'hori')
            barClientLength = barElem.current.clientWidth;

        barData.current = {
            howMuchToScroll: toScroll,
            scrolled: 0,
            prevScrolled: 0,
            initialThumbPercent: '30%',
            initialPosition: 0,
            thumbLength: null,
            totalLength: barClientLength - (barPadding * 2),
            spaceToScroll: null,
            scrollPerMovement: null,
            translationPerScroll: null,
            posDifference: positionDifference,
            tempTranslation: {
                trans: 0, transWork: 0, saveWork: () => {
                    barData.current.tempTranslation.trans = barData.current.tempTranslation.transWork;
                }
            },

            thumbPercentagePerExtra: '0.05%',
            thumbPercentage: () => {
                if (barData.current.initialThumbPercent) {
                    let percentage = getPercentageValue(barData.current.initialThumbPercent);
                    if (percentage === -1) {
                        throw new Error('❌ getPercentageValue function return with -1 ');
                    }
                    return percentage;
                }
                throw new Error("❌ seens like barData is not set before thumbPercentage function call, from the object barData");
            }

        }

        console.log('the barElem clientWidth : ', barClientLength);
        //console.log(`the Data to work with : 
        //  type : ${type}`, '\n', 'barData : ', barData.current);

        //prepareScroll
        try {

            let percentage = barData.current.thumbPercentage();
            let initalThumbLength = (percentage / 100) * barData.current.totalLength;
            let scrollSpaceToScroll = barData.current.totalLength - initalThumbLength;


            if (toScroll <= scrollSpaceToScroll) {
                prepareSimpleScroll(barData.current);
            } else {
                prepareDynamicScroll(barData.current);
            }
            if (barData.current.thumbLength)
                setThumbLength(barData.current.thumbLength);
            if (barData.current.initialPosition)
                scrollLogic.useInitalPosition(setThumbPosition, barData.current);

        } catch (error) {
            console.error(error);
        }


    }, [toScroll, positionDifference])

    useEffect(() => {
        boundedFunctions.current = {
            activeMouseMovement: scrollLogic.activeMovement.bind(null, boolActiveScrolling, previousMousePoint, mouseMoveRef),
            deActiveMouseMovement: scrollLogic.deActiveMovement.bind(null, boolActiveScrolling, barData),
            moveScroll: scrollLogic.moveScroll.bind(null, boolActiveScrolling, previousMousePoint, mouseMoveRef),
        }
    }, [])

    useEffect(() => {
        scrollLogic.moveScroll(boolActiveScrolling, previousMousePoint, mouseMoveRef, barData.current, setThumbPosition, setTranslation, type);
    }, [mouseMove])


    useEffect(() => {
        let breath = '15px';
        let length = '92%';
        let pos = '5px';
        let padding = '3px';
        let paddingBar = barPadding + 'px';

        if (type === "hori") {
            let newStyle = {
                wrapper: {
                    bottom: '0px',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: padding,
                },
                bar: {
                    height: breath,
                    width: length,
                    right: pos,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: paddingBar,
                }
            };
            setStyle({ ...newStyle });

        } else {
            let newStyle = {
                wrapper: {
                    right: '0px',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingRight: padding,
                },
                bar: {
                    height: length,
                    width: breath,
                    bottom: pos,
                    flexDirection: 'rows',
                    justifyContent: 'center',
                    padding: paddingBar,

                }
            };
            setStyle({ ...newStyle });
        }
    }, [type])

    useEffect(() => {
        window.addEventListener('mouseup', boundedFunctions.current.deActiveMouseMovement);
        window.addEventListener('dragstart', (e) => e.preventDefault());

        return (() => {
            window.removeEventListener('mouseup', boundedFunctions.current.deActiveMouseMovement);
            window.removeEventListener('dragstart', (e) => e.preventDefault());

        })
    }, [])

    //return if 
    if (!toScroll) {
        console.warn(`⚠️ No Scroll Bar
            Type : ${type},
            toScroll : ${toScroll}
            `);
        return;
    }
    if (!positionDifference) {
        console.warn(`⚠️ No positionDifference
            Type : ${type},
            positionDifference : ${positionDifference}
            `);
        return;
    }
    if (!setTranslation) {
        console.warn('⚠️ No transltion functinality to the Bar component');
    }

    return (
        <>
            <div style={style ? style.wrapper : null}
                className='absolute flex '>

                <div ref={barElem}
                    style={style ? style.bar : null}
                    className='relative flex bg-amber-700 rounded-xl  '>

                    <Thumb type={type} length={thumbLength}
                        position={thumbPosition} activeScrollMovement={boundedFunctions.current ? boundedFunctions.current.activeMouseMovement : null}
                    />
                </div>
            </div>
        </>
    );
}


function ScrollBar({ viewHeight, viewWidth, parentRef, childRef, childScaled }) {

    const { width: childWidth, height: childHeight, propRef: childDimention } = useBoundingRect(childRef);
    const [toScroll, setToScroll] = useState({ width: null, height: null });
    const [positionDiff, setpositionDiff] = useState(null);
    const [translation, setTranslation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!parentRef.current || !childHeight || !childWidth || !viewHeight || !viewWidth || !childDimention.current)
            return;

        //console.log(' ------ Initial Processes   : ');

        console.log('child Width and Height : ', childWidth, ",", childHeight);
        // console.log('client Width and Height : ', parentRef.current.clientWidth, ",", parentRef.current.clientHeight);

        let parentBoundingData = parentRef.current.getBoundingClientRect();

        //Calculating How Much To Scroll.
        console.log(' ------ Calculating How much to scroll  : ');
        let scrollDiffWidth = childWidth - parentRef.current.clientWidth;
        let scrollDiffHeight = childHeight - parentRef.current.clientHeight;

        //Noitfy How Much To Scroll showing odd nature.
        if (scrollDiffHeight <= 0 || scrollDiffWidth <= 0) {
            console.warn(`the scrollDiff is 0 or less than 0, scroll should not apply here.
                scrollDiff : 
                Height : ${scrollDiffHeight},
                Width : ${scrollDiffWidth},        
                `);
            return
        }
        console.log('✅ Succesfull calculated ');
        setToScroll({ width: scrollDiffWidth, height: scrollDiffHeight });

        //Calculating diff of the position of the children and parent div, respect to viewport.
        let diffX = parentBoundingData.x - childDimention.current.x;
        let diffY = parentBoundingData.y - childDimention.current.y;
        /* 
        
        console.log(' ------ Calculating the diff of the pos : ');
        console.log("the boundingData  : ");
        console.log('parent : ', parentBoundingData);
        console.log('child : ', childDimention.current);
        
        console.log(`The diff : 
        diffX : ${diffX}
        diffY : ${diffY}
        `)
        */


        setpositionDiff({ diffX: diffX, diffY: diffY });

        //Noitfy the diff showing odd nature
        if (diffX < 0 || diffY < 0) {
            console.warn(`the positionDiff is Less than 0. Seems like child moved intentionaly or accidently,
                    Now the child initial position is inside the parent.
                    positionDiff : 
                    diffX : ${diffX},
                    diffY : ${diffY},    
                    `);
            return
        }
        console.log('✅ Succesfull calculated ');
        setToScroll({ width: scrollDiffWidth, height: scrollDiffHeight });

    }, [childWidth, childHeight, viewHeight, viewWidth])


    useEffect(() => {
        if (!childRef?.current || !childScaled)
            return;


        childRef.current.style.transform = `translateX(${translation.x}px) translateY(${translation.y}px) scale(${childScaled}) )`;
        console.log("✅ boundingRect of child ", childRef.current.getBoundingClientRect());
        console.log("✅ boundingRect of parent ", parentRef.current.getBoundingClientRect());
        console.log("scaled is : ", translation.x / childScaled);
    }, [translation, childRef, childScaled])


    //Return if 
    if (!childRef && !parentRef) {
        console.error('❌ Please provide childRef and parentRef elem to the ScrollBar');
        return false;
    }

    return (
        <>

            {/* Horizontal Scroll --  */}

            <Bar type='hori' toScroll={toScroll.width}
                positionDifference={positionDiff?.diffX ? positionDiff.diffX : null}
                setTranslation={setTranslation} />




            {/* Vertical Scroll --  */}
            <Bar type='verti' toScroll={toScroll.height}
                positionDifference={positionDiff?.diffY ? positionDiff.diffY : null}
                setTranslation={setTranslation} />


        </>
    );
}


export default ScrollBar;