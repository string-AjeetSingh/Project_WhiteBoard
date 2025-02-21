import { addEvent, removeEvent } from "../utilities/addRemoveEvent";

class effectEventClass {
    constructor() {
        this.AboutEvents = [];
        this.trySome = [];

    }

    setEvent = (theRef, eventName, callback) => {
        if (theRef.current) {

            addEvent(theRef, eventName, callback);
            this.AboutEvents.push({ theRef: theRef, eventName: eventName, callback: callback });
        }
    }
    returnEvents = () => {
        this.AboutEvents.forEach((item) => {
            if (item.theRef.current) {
                removeEvent(item.theRef, item.eventName, item.callback);
            }
        })
    }
    outEventsInfo = () => {
        return this.AboutEvents;
    }
    setTrySome = (theRef) => {
        this.trySome.push(theRef);
    }
    outTrySome = (index = 0) => {
        return this.trySome[index];
    }
}

export { effectEventClass }