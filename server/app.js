const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const plansRouter = require('./routes/plans');
const planningIdRouter = require('./routes/planningId');
const generateSchedule = require('./routes/generateSchedule');

const db = require("./db");
const trendLocations = require('./routes/trendLocations');
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
const userRegistration = require('./helpers/userRegistration')(db);
const addLocation = require('./helpers/addLocation')(db);
const cors = require('cors')
const addPlanning = require('./helpers/addPlanning')(db);
const planningId = require('./helpers/planningId')(db);

const userPlans = require('./routes/userPlans');

const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use(cors())
// app.options('*', cors())
app.all('*', function(req, res, next) {   res.header('Access-Control-Allow-Origin', '*');   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');   res.header('Access-Control-Allow-Headers', 'Content-Type');   next(); });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", trendLocations(db));
app.use('/', indexRouter);
app.use('/users', usersRouter(userRegistration));
app.use('/userslogin', loginRouter(db));
app.use('/profile', profileRouter(db));
app.use('/trend-attrctions', profileRouter(db));
app.use('/api', userPlans(db));
// app.use('/addlocation', plansRouter(addLocation));
app.use('/addplanning', plansRouter(addPlanning));
app.use('/planningid', planningIdRouter(planningId));
app.use('/generateschedule', generateSchedule());

module.exports = app;
