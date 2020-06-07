const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Section} = require('../models/section');
const Grid = require('gridfs-stream');

// connect mongoose with grid
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

// once connected
conn.once("open", () => {
    
    gfs = Grid(conn.db);
    

    // getfile returns the file with given id
    function getfile(id){
        return new Promise((resolve,reject)=>{
            gfs.files.findOne({_id: id},((err, files) => {
                let data = []; 
                if(files)   {            
                let readstream = gfs.createReadStream({
                    filename: files.filename
                });
    
                readstream.on('data', (chunk) => {
                    data.push(chunk);
                });
    
                readstream.on('end', () => {
                    data = Buffer.concat(data);
                    // if its image return in base64
                    let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                    resolve(img);
                    
                });
    
                readstream.on('error', (err) => {
                  // if theres an error, respond with a status of 500
                  // responds should be sent, otherwise the users will be kept waiting
                  // until Connection Time out
                    reject(err);
                });}
            }));
        

        });

    }

    router.post('/section', async(req, res) => {
        const section = await Section.find({email:req.body.email});
        if(!section) return res.status(404).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });

    router.post('/search', async(req, res) => {
        const section = await Section.find({email:req.body.email,status:req.body.status});
        if(!section) return res.status(404).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });

    router.post('/labels', async(req, res) => {
        const section = await Section.find({email:req.body.email,label:req.body.label});
        if(!section) return res.status(404).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });

    router.post('/fetch', async(req, res) => {
        const section = await Section.find({email:req.body.email,label:req.body.label});
        if(!section) return res.status(403).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });

    router.post('/filter', async(req, res) => {
        //Check applicable fields
        let search = {email:req.body.email}
        let sort_order = 1;
        if(req.body.label == 'Not Labelled') search.label=""
        else if(req.body.label != "") search.label=req.body.label
        
        if(req.body.status!="") search.status = req.body.status
        
        if(req.body.priority!=""){
            search.pin_color = req.body.priority=='Pinned'?'#178515':'#a4c5c6'
        }
        if(req.body.reminder=="Descending") sort_order = -1
        console.log("Filter:",search)
        const section = await Section.find(search).sort( { 'reminder': sort_order } );
        if(!section) return res.status(403).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });

    router.post('/reminder', async(req, res) => {
        const section = await Section.find({email:req.body.email,reminder:{$ne:''}});
        if(!section) return res.status(404).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });

    router.post('/todo', async(req, res) => {        
        yesterday = new Date()
        yesterday.setDate(yesterday.getDate()-1);
        tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate()+1);
        const section = await Section.find({email:req.body.email,reminder : {"$gte": yesterday,
        "$lt": tomorrow}});
        if(!section) return res.status(404).send("Notes not found");
        const data = []
        for(let i = 0 ; i <section.length;i++ ){
            let arr = []
            if(section[i].image) arr = await getfile(section[i].image);         
            const resp = {
                title : section[i].title,
                image : arr?arr:'',
                description : section[i].description,
                reminder : section[i].reminder,
                _id : section[i]._id,
                pin_color : section[i].pin_color,
                note_color : section[i].note_color,
                label : section[i].label,
                status : section[i].status
            }

            data.push(resp);
        };
      res.send(data);
    });


    function addfile(part){
        return new Promise((resolve,reject)=>{
            let result = []
            let i = 0;
             
                let writeStream = gfs.createWriteStream({
                    filename: 'img_' + part.name,
                    mode: 'w',
                    content_type: part.type
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
                    resolve (result);
                });
                // using callbacks is important !
                // writeStream should end the operation once all data is written to the DB 
                writeStream.write(part.data, () => {
                  writeStream.end();
                });  
        });       
    }


    router.post('/addnote',async(req, res) => {
      
        function replaceall(exp,from,to){
            return exp.split(from).join(to).trim();
        }
        // adding images
        let images = []
        if(req.files.image)  images = await addfile(req.files.image[0]);
        let set_date = null;
        if(req.body.reminder!='')
        {
            fetched_date = new Date(req.body.reminder)
            month = fetched_date.getMonth().toString().length == 1 ? '0'+(fetched_date.getMonth()+1):fetched_date.getMonth()+1
            date = fetched_date.getDate().toString().length == 1 ? '0'+(fetched_date.getDate()):fetched_date.getDate()
            set_date = fetched_date.getFullYear()+"-"+month+"-"+date+"T"+req.body.reminder.split(' ')[4]+".000Z"
        }
        const section = new Section({
            title : replaceall(req.body.title,'"',''),
            image : req.files.image?images[0].file._id:null,
            description : replaceall(req.body.description,'"',''),
            reminder : set_date != null ? new Date(set_date) : null,
            email : replaceall(req.body.email,'"',''),
            pin_color : '#a4c5c6',
            label : replaceall(req.body.label,'"',''),
            note_color : replaceall(req.body.note_color,'"',''),
            status : replaceall(req.body.status,'"','')
        })
        console.log("After:",section.reminder);
        const sec = await section.save();
        return res.status(200).send(sec);
  
        })
    ; 
});


    router.post('/deletesection/',async(req,res)=>{
        const section = await Section.findOneAndRemove({ _id : req.body._id});
        if(!section) return res.status(404).send("No section of req name found");
            if(section.image){
             await gfs.remove({ _id: section.image},(err)=>{
                if(err) return res.status(500).send("error while deleting files")
            });}

        res.status(200).send("Deleted sucessfully");

    })

   
    router.get('/authenticate',async(req,res) => {

        if(req.session.passport != undefined ){
           
            if ( (! req.isAuthenticated() ) ||   (req.session.passport.user.isAdmin == false) ){
                res.status(403).send(false);
            }
            else{
                res.send(true);
            }
        }
        else{
            res.status(403).send(false);
        }
        
    });

    router.post('/pin_color',async(req,res) => {
        let myquery = { _id: req.body._id };
        let newvalues = { $set: {pin_color: req.body.pin_color } };
        await Section.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
        newvalues = { $set: {status: 'Pin' } };
        await Section.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
        });        
    });

    router.post('/unpin_color',async(req,res) => {
        let myquery = { _id: req.body._id };
        let newvalues = { $set: {pin_color: '#a4c5c6' } };
        await Section.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
        newvalues = { $set: {status: '' } };
        await Section.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
        });        
    });

    router.post('/status',async(req,res) => {
        let myquery = { _id: req.body._id };
        let newvalues = { $set: {status: req.body.status } };
        await Section.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });        
    });

    router.post('/fetchLabels',async(req,res) => {
        const section = await Section.find({email:req.body.email});
        if(!section) return res.status(404).send("Notes not found");
        data = []  
        for(let i =0;i<section.length;i++) data.push(section[i].label)
        res.send(data)  ;
    });

    router.post('/note_color',async(req,res) => {
        let myquery = { _id: req.body._id };
        let newvalues = { $set: {note_color: req.body.note_color } };
        await Section.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });        
    });

    router.post('/analysis', async(req, res) => {
        console.log("email:",req.body.email)
        const total_section = await Section.find({email:req.body.email});
        const section = await Section.find({email:req.body.email,status:'Archive'});
        
        let data = {
            total:total_section.length,
            completed:section.length
        }
        console.log("Length:",data)
        res.send(data);
    });

   

module.exports = router;
