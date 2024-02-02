const Estacionamiento = require('../models/Estacionamiento')
const { checkIn } = require('../models/checkIn')

// Function to determine if it is a weekend
function isWeekendDay() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

// Path for checkIn method
const setCheckIn = async (req, res) => {
  const { parkingId, userType } = req.body
  try {
    // We get the parking from the database
    const estacionamiento = await Estacionamiento.findByPk(parkingId)

    if (!estacionamiento) {
      return res.status(404).json({
        success: false,
        errorCode: 'PARKING_NOT_FOUND',
        message: 'Parking not found',
      })
    }

    // We determine if it is the weekend
    const isWeekend = isWeekendDay()

    // We use the checkIn method to validate the entry
    const result = checkIn(estacionamiento.parkingType, userType, isWeekend)

    res.json(result)
  } catch (error) {
    console.error('Error processing check-in request:', error)
    res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
    })
  }
}

module.exports = { setCheckIn }
