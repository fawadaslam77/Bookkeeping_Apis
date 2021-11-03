const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // an optional middleware to log incomming requests into the console window
const mongoose = require('mongoose');

//import middlewares
const AllowCORS = require('./middlewares/AllowCORSMiddleware');

//import routes
const usersRoutes = require('./routes/UserRoute');
const financeRoutes = require('./routes/FinanceRoute');
const assetRoutes = require('./routes/AssetRoute');
const transferRoutes = require('./routes/TransferRoute');

const app = express();
// mongoose.connect(
//   'mongodb+srv://admin:admin123@cluster0.9nux1.mongodb.net/hisab_kitab?retryWrites=true&w=majority',
//   { useNewUrlParser: true },
// );
mongoose.connect(
  'mongodb+srv://Ktechs:azk--azk466@ktechs-yaz3y.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true },
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // Now all the incomming requests with funnel through it and will get logded into the console window.
app.use(AllowCORS); // Enable CORS
app.use('/users', usersRoutes);
app.use('/finance', financeRoutes);
app.use('/asset', assetRoutes);
app.use('/transfer', transferRoutes);

module.exports = app;
