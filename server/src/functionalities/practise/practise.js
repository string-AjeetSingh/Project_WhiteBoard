import { createClient } from "@supabase/supabase-js";
import fs from 'fs';
import Utils from "../../globalFuntionalities/utils.js";
import { json } from "stream/consumers";
import { toUnicode } from "punycode";

const supabaseUrl = "https://hmkacsdomvfestztkqbm.supabase.co";
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhta2Fjc2RvbXZmZXN0enRrcWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjYxNjEzMSwiZXhwIjoyMDU4MTkyMTMxfQ.0sixfVp6pblcXizWMgcwshKsdZCJTFDdhtISz4L2QhA";

const supabase = createClient(supabaseUrl, supabasekey);

const handles = {
    uploadImg: async (req, res) => {

        if (supabase) console.log('the supabase instance is  :', supabase);
        else {
            const message = 'Unable to fetch instance if the supabase';
            console.error(message);

            res.json({
                "status": false,
                "message": message
            })
            return false;
        }

        //uplaod image
        const fileBuffer = fs.readFileSync('./media/OIP.jpeg');
        if (fileBuffer) console.log("the file buffer we have is :", fileBuffer);
        else {
            const message = 'unable to have the file buffer';
            console.log(message);
            res.json({
                status: false,
                message: message
            })
            return false;
        }
        const { data, error } = await supabase.storage.from('prac')
            .upload('media/pracImg.jpeg', fileBuffer, {
                contentType: 'image/jpeg',
            })

        if (data) {
            console.log("the data is here : ", data);
            res.json({
                status: true,
                message: 'image is setted',
            })
            return true;
        }
        else if (error) {
            console.error('the data is not found from storage, the error is : ', error);
            res.json(Utils.responseJson(['status', 'message'], [false, 'no response from the server']));

            return false;
        }

        console.error("nothing happened here");
        return false;



    },

    database: {
        select: async (req, res) => {
            console.log('running the database select here ');

            if (!req.params) {
                res.json(Utils.responseJson(['status', 'message'], [false, 'no params found']));
                return;
            }

            const result = await supabase.from('prac').select('*');

            console.log('the result from select  : ', result);
            if (result.data) {
                res.json(Utils.responseJson(['status', 'message'], [true, `the result we found result : ${result.data}`]));
                return;
            } else {
                res.json(Utils.responseJson(['status', 'message'], [false, `no result found : ${result.error}`]));
                return;
            }

        }

    }

}

export default handles;