const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const io = require('../socket');
const HttpError = require('../models/http-error');
const Travel = require('../models/travel');
const Client = require('../models/client');

const _validateRequestData = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Дані вказано невірно', 422))
  }
}

const _initTravel = (reqBody) => {
  const propNamesArray = [
    'departureDate',
    'departureCity',
    'departurePlace',
    'arrivalTime',
    'arrivalCity',
    'arrivalPlace',
    'promoNotification',
    'seatsAmount',
    'seatsReserved',
    'price',
    'luggagePrices',
    'creatorId'
  ];
  let travelObject = {};
  for (const prop of propNamesArray) travelObject[prop] = reqBody[prop];
  return travelObject;
}

// Passenger 

const getTravelList = async (req, res, next) => {
  let travelList;

  try {
    travelList = await Travel.find({});
  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_TC 46]`, 500))
  }

  res.status(200).json({ travelList: travelList.map(travel => travel.toObject({ getters: true })) });
};

const addReservation = async (req, res, next) => {
  let travel;
  let updatedTravel;
  let orderData;

  try {
    travel = await Travel.findById(req.body.travelData.id);
    if (!travel) return next(new HttpError('Жодного маршруту за вказаним ID не знайдено', 404));

    orderData = req.body;
    if (!orderData) return next(new HttpError('Помилка даних req.body [B_TC 78]', 400));

    // init new order
    const newOrder = {
      person: { ...orderData.person },
      seatsAmount: orderData.seatsAmount,
      notification: orderData.notification,
      totalPrice: travel.price * orderData.seatsAmount
    };

    // add new order to order list
    const orders = [...travel.orders];
    orders.push(newOrder);
    travel.orders = orders;

    // increase reserved seats amount
    travel.seatsReserved = travel.seatsReserved + orderData.seatsAmount;

    // save updated travel to db
    updatedTravel = await travel.save();

    const updTravelObject = updatedTravel.toObject({ getters: true });
    const updOrders = updTravelObject.orders;
    const updTravelId = updTravelObject.id;
    const order = updOrders[updOrders.length - 1]

    // socket.io
    io.getIO().emit('orders', { mode: 'add', data: { travelId: updTravelId, order } });

    // save as client
    try {
      const tData = orderData.travelData;
      const clientData = {
        name: orderData.person.name,
        phone: orderData.person.phone,
        travelData: {
          departureDate: tData.departureDate,
          departureCity: tData.departureCity,
          arrivalCity: tData.arrivalCity
        }
      }
      const client = new Client(clientData);
      createdClient = await client.save();
      clientObj = createdClient.toObject({ getters: true });
    } catch (err) {
      console.log(err);
    }

    // in success case
    res.status(200).json(
      {
        message: 'Successfully reserved',
        dialogContent: {
          title: 'Успішно',
          message: 'Ви зарезервували місця на обраний маршрут. Чекаємо на Вас.'
        },
        travelId: updTravelId,
        order
      }
    );

  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_TC 142]`, 500))
  }
};

const cancelReservation = async (req, res, next) => {

  orderData = req.body;
  if (!orderData) return next(new HttpError('Помилка даних req.body [B_TC 149]', 400));

  const { travelId, orderId } = orderData;

  if (!travelId || !orderId) return next(new HttpError('Помилка даних req.body [B_TC 153]', 400));

  try {

    const travel = await Travel.findById(travelId);
    if (!travel) return next(new HttpError('Жодного маршруту за вказаним ID не знайдено', 404));

    const orders = travel.orders;
    const order = orders.find(o => o.id === orderId);
    if (!order) return next(new HttpError('Жодного резерву за вказаним ID не знайдено', 404));

    // update the amount of reserved seats
    const updSeatsReserved = travel.seatsReserved - order.seatsAmount
    travel.seatsReserved = updSeatsReserved;


    // remove order
    const updOrders = orders.filter(o => o.id !== orderId);
    travel.orders = updOrders;

    // save updated travel to db
    await travel.save();

    // socket.io
    io.getIO().emit('orders', { mode: 'cancel', data: { travelId, orderId, updSeatsReserved } });

    // in success case
    res.status(200).json({ message: 'Successfully cancelled' });

  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_TC 184]`, 500))
  }
};

// Driver 

const getDriverTravelList = async (req, res, next) => {
  const driverId = req.params.driverId;
  let travelList;

  try {
    travelList = await Travel.find({ creatorId: driverId });

  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_TC 199]`, 500))
  }

  res.status(200).json({ travelList: travelList.map(travel => travel.toObject({ getters: true })) });
}

const createTravel = async (req, res, next) => {
  _validateRequestData(req, next);

  let createdTravel;
  const travelData = _initTravel(req.body);
  const newTravel = new Travel(travelData);

  try {
    createdTravel = await newTravel.save();
    travel = createdTravel.toObject({ getters: true });

    // socket.io
    io.getIO().emit('travels', { action: 'create', data: travel });

    res.status(200).json({
      message: 'Successfully created.',
      travel
    });


  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_TC 191]`, 500))
  }
};

const updateTravel = async (req, res, next) => {
  _validateRequestData(req, next);

  let travel;
  const travelId = req.params.travelId;

  try {
    travel = await Travel.findById(travelId);
    if (!travel) return next(new HttpError('Жодного маршруту за вказаним ID не знайдено', 404));

    // assign updated values
    const travelData = _initTravel(req.body);
    for (const prop in travelData) travel[prop] = travelData[prop];

    // save to db
    await travel.save();

    // convert travel data to object
    const updTravel = travel.toObject({ getters: true })

    // socket.io
    io.getIO().emit('travels', { action: 'update', data: updTravel });

    res.status(200).json({
      message: 'Successfully updated.',
      travel: updTravel
    });

  } catch (err) {
    console.log(err);
    return next(new HttpError(`${ err._message } [B_TC 225]`, 500))
  }
};

const deleteTravel = async (req, res, next) => {
  const travelId = req.params.travelId;
  let travel;

  try {
    travel = await Travel.findById(travelId);
    if (!travel) return next(new HttpError('Жодного маршруту за вказаним ID не знайдено', 404));

    // remove travel from db
    await travel.remove();

    // socket.io
    io.getIO().emit('travels', { action: 'delete', data: travelId });

    res.status(200).json({ message: 'Successfully deleted.' });

  } catch (err) {
    return next(new HttpError(`${ err._message } [B_TC 246]`, 500))
  }
};

exports.getTravelList = getTravelList;
exports.getDriverTravelList = getDriverTravelList;
exports.createTravel = createTravel;
exports.updateTravel = updateTravel;
exports.deleteTravel = deleteTravel;
exports.addReservation = addReservation;
exports.cancelReservation = cancelReservation;
