//dependencies
const fs = require('fs');
const util = require('util');

const apiRoutes = require ('./routes/api.routes')
const htmlRoutes = require ('./routes/html.routes');
//set up express
const express = require ('express')
const app = express();
const PORT = process.env.PORT || 3001;


// Helper method for generating unique ids
const uuid = require('./helpers/uuid')
// const { readFromFile, readAndAppend } = require('./helpers/fsUtils');



//get css and js files
app.use(express.static('public'));


//middleware parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// PORT

app.listen(PORT,() => {

    console.log(`App listening on PORT ${PORT}`);

})



module.exports = app;