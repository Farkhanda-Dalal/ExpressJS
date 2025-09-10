import fs from "fs";

fs.readFile('input.txt', 'utf-8', (err, data) => { 
    if(err){
        console.log(err);
        return err;
    }

    console.log(data);
});