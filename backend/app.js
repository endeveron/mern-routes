const express = require('express');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const driverRoutes = require('./routes/driver-routes');
const travelRoutes = require('./routes/travel-routes');

const app = express();
app.use(express.json());

// prevent CORS errors
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
  );
  next();
});

app.use('/api/driver', driverRoutes);
app.use('/api/travel', travelRoutes);

app.use((req, res, next) => {
  return next(new HttpError('Маршрут вказано невірно', 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || '[B_APP 38]' })
});

mongoose
  .connect()
  .then(() => {
    const server = app.listen(process.env.PORT, () => console.log('Connected to db'));
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    })
  })
  .catch(err => console.log(err));
