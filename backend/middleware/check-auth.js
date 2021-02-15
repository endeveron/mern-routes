const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    if (!req.headers.authorization) {
      throw new Error('Помилка аутентифікації');
    }
    const token = req.headers.authorization.split(' ')[1];  // Authorization: 'Berarer TOKEN'
    if (!token) {
      throw new Error('Помилка аутентифікації');
    }

    // validate the token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_KEY
    );
    //add user data to the request
    req.userData = { userId: decodedToken.userId };

    console.log('Auth Success');
    next();

  } catch (err) {
    console.log('Auth Err', err);
    return next(new HttpError('Помилка аутентифікації', 403));
  }
};
