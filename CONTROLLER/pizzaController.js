'use strict';

const pizzaController = require('./pizzaController'); 

const express = require('express');
const bodyparser = require('body-parser');
const app = express(); 

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

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