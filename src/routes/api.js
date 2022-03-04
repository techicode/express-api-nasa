const express = require('express');

const launchesRouter = require("../routes/launches/launches.router");
const planetsRouter = require("../routes/planets/planets.router");

const api = express.Router();

api.use('/launches', launchesRouter);
api.use('/planets', planetsRouter);

module.exports = api;