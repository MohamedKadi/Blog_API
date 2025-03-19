const errorController = require('./Controllers/errorController');
const authRouter = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const mongoose = require('mongoose');
const seedsRoutes = require('./Routes/seedsRoutes');

const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
require('dotenv').config();

app.use(morgan('dev'));

//connection with database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => handleError(error));

app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);
//for seeds
app.use('/api/seeds', seedsRoutes);

app.use('*', (req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
});

app.use(errorController);

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
