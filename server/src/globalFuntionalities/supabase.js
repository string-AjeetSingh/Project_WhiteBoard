import { createClient } from "@supabase/supabase-js";
import enviroment from "./../../config.js";

if (!enviroment.SUPABASE.PUBLIC_KEY || !enviroment.SUPABASE.URL) {
    throw new Error('Missing supabase env variables');
}
const supabase = createClient(enviroment.SUPABASE.URL, enviroment.SUPABASE.PUBLIC_KEY);

export default supabase;