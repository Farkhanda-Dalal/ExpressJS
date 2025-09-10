import fs from "fs";

fs.readFile('input.txt', 'utf-8', (err, data) => { 
    if(err){
        console.log(err);
        return err;
    }

    console.log(data);

    const newData="This is new Output File"+data;
    const opData=newData.toUpperCase();

    //Func with 2nd call back
    fs.writeFile('output.txt', opData, (err) => { 
        if(err){
            console.log(err);
            return err;
        }

        console.log("File was written successfully !");
     })

    //Func with 3rd call back
     fs.readFile('output.txt', 'utf-8', (err, data) => { 
        if(err){
            console.log(err);
            return err;
        }

        console.log(data);
      })

 }
)