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










app.listen(3000, () => {
    console.log(`API server now on port 3000!`);
  });