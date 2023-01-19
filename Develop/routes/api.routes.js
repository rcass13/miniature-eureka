const fs = require("fs");
const util = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const router = require("express").Router();
const path = require('path');

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

//
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json','utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
        }
      });
});

//delete the note
router.delete("/notes/:id", function(req, res) {
  let noteId = req.params.id;
  console.log(`Deleting note with id ${noteId}`);

  fs.readFile('./db/db.json','utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
        let parsedData = JSON.parse(data);
        parsedData = parsedData.filter(currentNote => currentNote.id != noteId);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), err => {
          if (err) {
            console.error(err);
          } else {
            console.log("note has been deleted")
            res.json(parsedData);
          }
        })}})}); 

router.post('/notes', (req, res) => {
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

  module.exports = router;