const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const db = require("./db");
const trendCities = require('./routes/trendCities');
const trendLocations = require('./routes/trendLocations');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", trendCities(db));
app.use("/api", trendLocations(db));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
