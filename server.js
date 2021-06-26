const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({extend: true }));
// parse incoming JSON data
app.use(express.json());

// make files readily available 
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
const { static } = require("express");
const { notStrictEqual } = require('assert');


// get routes

// return index.html file
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// return notes.html file
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// return all saved notes as JSON
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        return res.json(parseData);
    });
});

// receive a note, save on the request body and add it to the db.json.
// return the new note

app.post("/api/notes", function (req, res) {
 const newNote = {...req.body, id: req.body.title.toLowerCase().replace(/\s+/g, "")};;
 fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    var addedNote = [...notes, newNote];

    fs.writeFile("db/db.json", JSON.stringify(addedNote), (err, data) => {
      if (err) {console.log(err)};
      console.log("A note has been added");
    })
  });

  res.json(newNote);
}); 

// delete notes
app.delete("/api/notes/:id", function (req, res) {
    const deleteNote = req.params.id

  fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    var deletedNote = notes.filter( note => {
      if (note.id !== deleteNote) {
        return note
      }
    })

    fs.writeFile("db/db.json", JSON.stringify(deletedNote), (err, data) => {
      if (err) {console.log(err)};
      console.log("A note has been deleted");
    })
  });
  res.json(deleteNote)
}); 



app.listen(3000, () => {
       console.log(`API server now on port 3000!`);
 });