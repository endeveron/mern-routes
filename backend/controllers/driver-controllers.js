const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Driver = require('../models/driver');
const Code = require('../models/code');

const getDriverFromDb = async (email) => {
  let fetchedDriver;
  try {
    fetchedDriver = await Driver.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_DC 15]`, 500))
  }
  return fetchedDriver;
};

const isCodeConfirmed = async (code) => {
  try {
    code = await Code.findOne({ code: code });
    return !!code
  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_DC 30]`, 500))
  }
};

const genetrateJWToken = (driverId, code, email) => {
  if (!driverId || !code || !email) {
    return new Error('Невірно вказані дані для генерації токена [B_DC 36]')
  }
  try {
    const token = jwt.sign(
      { driverId, code, email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    return token;
  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_DC 47]`, 500))
  }
}

const signup = async (req, res, next) => {

  // express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Перевірте вказані дані', 422));
  }

  const { code, email, password, phones } = req.body;

  // checking the access code
  const codeConfirmed = await isCodeConfirmed(code);
  if (!codeConfirmed) {
    return next(new HttpError('Невірний код доступу', 422))
  }

  // checking is driver already exists
  const fetchedDriver = await getDriverFromDb(email);
  if (fetchedDriver) {
    return next(new HttpError('Водія з таким email вже зареєстровано', 422))
  }

  // hashing the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 8);
  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_DC 79]`, 500))
  }

  const driver = new Driver({
    code,
    email,
    password: hashedPassword,
    phones
  });

  try {
    await driver.save();

  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_DC 94]`, 500))
  }

  // generating JWT
  const token = genetrateJWToken(driver.id, driver.code, driver.email);

  res.status(201).json({
    driverId: driver.id,
    driverEmail: driver.email,
    token
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // checking is driver already exists
  const fetchedDriver = await getDriverFromDb(email);

  if (!fetchedDriver) {
    return next(new HttpError('Вказана email адреса не зареєстрована у базі', 403))
  }

  // checking the password validity
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, fetchedDriver.password);
  } catch (err) {
    return next(new HttpError(`${ err._message } [B_DC 122]`, 500))
  }

  if (!isValidPassword) {
    return next(new HttpError('Пароль вказано невірно', 403))
  }

  // generating JWT
  const token = genetrateJWToken(fetchedDriver.id, fetchedDriver.code, fetchedDriver.email);

  res.status(201).json({
    driverId: fetchedDriver.id,
    email: fetchedDriver.email,
    token
  });

};

const getDriverPhones = async (req, res, next) => {
  const { driverId } = req.body;

  let fetchedDriver;

  try {
    fetchedDriver = await Driver.findOne({ _id: driverId });

    if (!fetchedDriver || !fetchedDriver.phones) {
      res.status(404).json({
        driverPhones: null
      });
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_DC 15]`, 500))
  }

  res.status(200).json({
    driverPhones: fetchedDriver.phones
  });
}

exports.signup = signup;
exports.login = login;
exports.getDriverPhones = getDriverPhones;
