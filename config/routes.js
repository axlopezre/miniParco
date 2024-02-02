const express = require('express')
const parkinglot = require('../modules/parkingLotModule')
const checkIn = require('../modules/checkInModule')
const router = express.Router()

router.post('/crear-estacionamiento', parkinglot.createParkingLot)
router.get('/estacionamientos', parkinglot.getParkingLots)
router.put('/actualizar-estacionamiento/:id', parkinglot.updateParkingLot)
router.post('/check-in', checkIn.setCheckIn)

module.exports = router
