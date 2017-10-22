'use strict';

const pizzaController = require('./pizzaController'); 

const express = require('express');
const app = express();

// const request = require('request');


app.get('/', (req, res, next) => {
  res.end();
});

app.post('/', (req, res, next) => {
  res.end();
});

app.put('/', (req, res, next) => {
  res.end();
});


app.delete('/', (req, res, next) => {
  res.end();
});

