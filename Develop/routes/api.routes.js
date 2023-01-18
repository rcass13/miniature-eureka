const app = require('express').Router();

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

  module.exports = app;