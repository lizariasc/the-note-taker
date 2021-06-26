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



app.listen(3000, () => {
       console.log(`API server now on port 3000!`);
 });