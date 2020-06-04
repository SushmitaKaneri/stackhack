const express = require('express');
const mongoose = require('mongoose');
//declare module 'busboy-body-parser';
const logger = require('morgan');
const busboyBodyParser = require('busboy-body-parser');
const cb = require('connect-busboy');
const fs = require('fs');
let Grid = require("gridfs-stream");
//const multer = require('multer');
const app = express();

mongoose.connect('mongodb://localhost:27017/testgridfs')
.then(()=>{
    //console.log('connected to db')
})
.catch((err)=>{
    //console.log("error",err);
})


app.use(logger('dev'));
app.use(busboyBodyParser({ multi : true }));
//app.use(express.json())
//app.use(cb());

//app.use(express.json());

app.listen(3001,()=>{
    //console.log("listening on port 3000")
});

let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once("open", () => {
   // //console.log("open",conn.db);
    gfs = Grid(conn.db);
    app.get('/', (req, res) => {
      res.send('Hello Housem !');
    });
    app.get('/img/:imgname', (req, res) => {
      let imgname = req.params.imgname;
        gfs.files.find({
            filename: imgname
        }).toArray((err, files) => {

            if (files.length === 0) {
                return res.status(404).send({
                    message: 'File not found'
                });
            }
            let data = [];
            let readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', (chunk) => {
                data.push(chunk);
            });

            readstream.on('end', () => {
                data = Buffer.concat(data);
                let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                res.end(img);
            });

            readstream.on('error', (err) => {
              // if theres an error, respond with a status of 500
              // responds should be sent, otherwise the users will be kept waiting
              // until Connection Time out
                res.status(500).send(err);
                //console.log('An error occurred!', err);
            });
        });
    });


    function addfile(part){
        return new Promise((resolve,reject)=>{
            let result = []
            let i = 0;
             part.forEach(element => {
                let writeStream = gfs.createWriteStream({
                    filename: 'img_' + element.name,
                    mode: 'w',
                    content_type: element.mimetype
                });
        
                writeStream.on('close', (file) => {
                  // checking for file
                  i+=1
                  if(!file) {
                    reject('No file received');
                  }
                    result.push({
                        message: 'Success',
                        file: file
                    });
                    if(i == part.length){
                        resolve (result);
                    }
                    //console.log(result,i)
                });
                // using callbacks is important !
                // writeStream should end the operation once all data is written to the DB 
                writeStream.write(element.data, () => {
                  writeStream.end();
                });  
                
            });
        });
        
       
    }
    app.post('/img', async (req, res) => {
        //console.log(req.files);
        let part = req.files.files;
        
       // const result = await addfile(part); 
    
    
        //console.log("wtfffffffff",result,"wtffffffffffffff");
        res.send(result);
    });

   
    
});

