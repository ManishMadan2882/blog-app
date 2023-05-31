require('dotenv').config()
const api = require('./routes/api')
const express = require('express')
const path = require('path')
const port = 5400
const app  =  express()
app.use(express.static(path.join(__dirname,"..","build")));
app.use('/api',api)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"..","build","index.html"));
});
app.listen(port,()=>{
    console.log("Server up and running " + port);
})
