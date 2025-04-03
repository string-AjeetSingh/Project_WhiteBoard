//import supabase from "../supabase.js";

class useSupabase {
    constructor(supabase_instance) {
        this.supabase = supabase_instance;
        this.rsp = null;
    }

    async select(from, toSelect, filter = { filterName, column, value }) {
        this.checkSupabase();

        let rsp = null;

        if (filter) {
            rsp = await this.supabase
                .from(from)
                .select(toSelect)[filter.filterName](filter.column, filter.value);
        } else {
            rsp = await this.supabase
                .from(from)
                .select(toSelect)
        }

        rsp = this.handleResponse(rsp);
        this.updateResponse(rsp);     //store response at this.rsp

        return rsp;

    }

    async update(from, condition = { column: null, value: null }, updateObj) {
        // updateObj like {'profileid' : 2}

        let rsp = await this.supabase
            .from(from)
            .update(updateObj)
            .eq(condition.column, condition.value)
            .select()

        rsp = this.handleResponse(rsp);
        this.updateResponse(rsp);     //store response at this.rsp

        return rsp;

    }

    async insert(from, insertArray) {
        //insertyArray should contain object , referencing the valus to insert.

        let rsp = null;
        rsp = await this.supabase
            .from(from)
            .insert(insertArray)
            .select()

        rsp = this.handleResponse(rsp);
        this.updateResponse(rsp);     //store response at this.rsp
        return rsp
    }


    checkSupabase() {
        if (!this.supabase) {
            throw new Error('Please porvide supabase instance to constructor.');
        }
    }

    handleResponse(response) {
        const { data, error } = response;
        if (error) {
            console.error("Supabase Error:", error.message);
            return { success: false, error: error.message, data: null };
        }

        if (data.length < 1) {
            return { success: true, data: 'empty' };
        }
        return { success: true, data: data[0] };
    }
    updateResponse(response) {
        this.rsp = response;
    }
    lastResponse() {
        return this.rsp;
    }
}




/* 

let theSupabase = new useSupabase(supabase);
async function run() {
    let res = await theSupabase.select('prevdata', "name, value", null);
    console.log("the res from the theSupabase select : ", res);
}
run();

*/



export default useSupabase;