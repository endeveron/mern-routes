const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const {
  getTravelList,
  getDriverTravelList,
  createTravel,
  updateTravel,
  deleteTravel,
  addReservation,
  cancelReservation,
  // getTravelById,
} = require('../controllers/travel-controllers');

// open routes 
router.get('/', getTravelList);
router.post('/add-reservation', addReservation);
router.post('/cancel-reservation', cancelReservation);
// router.get('/:travelId', getTravelById);

// protected routes are below
router.use(checkAuth);

router.get('/:driverId', getDriverTravelList);

router.post('/', [
  body('departureDate').not().isEmpty(),
  body('departureCity').not().isEmpty(),
  body('departurePlace').not().isEmpty(),

  body('arrivalTime').not().isEmpty(),
  body('arrivalCity').not().isEmpty(),
  body('arrivalPlace').not().isEmpty(),

  body('seatsAmount').not().isEmpty(),
  body('seatsReserved').not().isEmpty(),
  body('price').not().isEmpty(),
  body('creatorId').not().isEmpty()
], createTravel);

router.patch('/:travelId', [
  body('departureDate').not().isEmpty(),
  body('departureCity').not().isEmpty(),
  body('departurePlace').not().isEmpty(),

  body('arrivalTime').not().isEmpty(),
  body('arrivalCity').not().isEmpty(),
  body('arrivalPlace').not().isEmpty(),

  body('seatsAmount').not().isEmpty(),
  body('seatsReserved').not().isEmpty(),
  body('price').not().isEmpty(),
  body('creatorId').not().isEmpty()
], updateTravel);

router.delete('/:travelId', deleteTravel);

module.exports = router;
