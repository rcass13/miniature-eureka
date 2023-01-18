const fs = require('fs');
const path = require('path');
const apiRoutes = require ('./routes/api.routes')
const htmlRoutes = require ('./routes/html.routes')
const express = require ('express')
const app = express();
const PORT = process.env.PORT || 3001;

// Helper method for generating unique ids
const uuid = require('./helpers/uuid'); 
// const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

//helper
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  ); 

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

//get css and js files
app.use(express.static('public'))

//middlewar parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);



// Add routes for HTML pages

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'notes.html'));

});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json','utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
            //   parsedData.push(content);
            //   writeToFile(file, parsedData);
        }
      });
});

app.delete(`/api/notes/:id`, (req, res) => {
    fs.readFile('./db/db.json','utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
              parsedData.delete(content);
            //   writeToFile(file, parsedData);
        }
      });
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const {title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });




// PORT

app.listen(PORT,() => {

    console.log(`App listening on PORT ${PORT}`);

})
module.exports = app;