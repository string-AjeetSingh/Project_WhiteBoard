
class clientError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
        this.name = 'clientError';
        this.message = this.name + ":  " + message;


    }

    logit(type = 'error') {
        if (type === 'warn') {
            console.warn(this.message);

        } else if (type === 'error') {
            console.error(this.message);
        }
    }
}


class supabaseError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
        this.name = 'supabaseError';
        this.message = this.name + ': ' + message;
    }
    logit(type = 'error') {
        if (type === 'warn') {
            console.warn(this.message);

        } else if (type === 'error') {
            console.error(this.message);
        }
    }
}

export { clientError, supabaseError }