const express = require('express');
const app = express();
const config = require('./config/config');
const feature = require('./routes/upload');  
const user = require('./routes/register');
const path = require("path");
app.use(express.static(path.join(__dirname, "../build")))

require('./config/mongo')(config);
require('./middleware/file')(app);

app.use('/api/upload',feature);
app.use('/api/user',user);
app.listen(3001,()=>{
    console.log("Listening on port ",3001);
});

