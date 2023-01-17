const fs = require('fs');
const apiRoutes = require ('./routes/api.routes')
const htmlRoutes = require ('./routes/html.routes')
const express = require ('express')
const app = express();
const PORT = 3001;

//get css and js files
app.use(express.static('public'))

//middlewar parsing JSON
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)



// Add routes for HTML pages

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'notes.html'));

});




// PORT

app.listen(PORT,() => {

    console.log(`App listening on PORT ${PORT}`);

})