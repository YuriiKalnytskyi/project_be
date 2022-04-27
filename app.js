const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const {
  constant: {
    PORT, DB_CONNECTION_URL, DB_CONNECTION_UR2L, DB_CONNECTION_URL3
  }
} = require('./constants');
const { errorMess: { UNKNOWN_ERROR, ROUTE_NOT_FOUND } } = require('./errors');
const { apiRouter } = require('./routes');

const app = express();

app.use(cors());

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use(fileUpload());
app.use('/api', apiRouter);
app.use(_handleErrors);
app.use('*', _notFoundHandler);

app.listen(PORT, () => {
  console.log(`app listen ${PORT} `);
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  console.log('_+_+_+_', err);
  res
    .status(err.status)
    .json({
      status: err.status,
      message: err.message || UNKNOWN_ERROR.message,
      customCode: err.customCode,
    });
}

function _notFoundHandler(err, req, res, next) {
  console.log('error ========== ', err);
  next({
    message: err.message || ROUTE_NOT_FOUND.message,
    status: err.status || ROUTE_NOT_FOUND.code,
  });
}

function _mongooseConnector() {
  mongoose.connect(process.env.DB_CONNECTION_URL4, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}
