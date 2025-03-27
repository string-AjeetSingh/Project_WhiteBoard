import supabase from "../supabase.js";

class useSupabase {
    constructor(supabase_instance) {
        this.supabase = supabase_instance;
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

        return rsp;

    }

    async update(from, condition = { column: null, value: null }, updateObj) {
        // updateObj like {'profileid' : 2}

        let rsp = await supabase
            .from(from)
            .update(updateObj)
            .eq(condition.column, condition.value)
            .select()

        rsp = this.handleResponse(rsp);
        return rsp;
        /* 
        
        let rsp = await supabase
        .from(from)
        .upsert(updateObj)
        .select()
        rsp = this.handleResponse(rsp);
        return rsp;
        */

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
}





let theSupabase = new useSupabase(supabase);
async function run() {
    let res = await theSupabase.select('prevdata', "name, value", null);
    console.log("the res from the theSupabase select : ", res);
}
run();

/* 
*/



export default useSupabase;