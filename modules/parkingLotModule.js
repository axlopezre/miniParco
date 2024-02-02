const Estacionamiento = require('../models/Estacionamiento')

// Route to create a parking lot
const createParkingLot = async (req, res) => {
  const { nombre, spots, contact, parkingType } = req.body

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'Nombre inválido.' })
  }

  try {
    // Reglas de negocio
    if (spots < 50) {
      return res.status(400).json({ error: 'The parking lot is very small.' })
    }

    if (spots > 1500) {
      return res.status(400).json({ error: 'The parking lot is very large.' })
    }

    // Check if the parking lot name is already in use in the database
    const existingParking = await Estacionamiento.findOne({
      where: { nombre: nombre },
    })
    if (existingParking) {
      return res.status(400).json({ error: 'The parking lot name is already in use.' })
    }

    // Create the parking lot in the database
    const newParkingLot = await Estacionamiento.create({
      nombre,
      spots,
      contact,
      parkingType,
    })

    // Return the information of the created parking lot and its unique ID
    res.status(201).json({ id: newParkingLot.id, ...newParkingLot.toJSON() })
  } catch (error) {
    console.error('Error creating parking lot:', error)
    res.status(500).json({ error: 'Internal Server Error.' })
  }
};

// Route to get the list of parking lots paginated and ordered
const getParkingLots = async (req, res) => {
  try {
    // Get the request params
    const { skip, limit, order, orderDir = 'ASC' } = req.query

    const skipInt = parseInt(skip, 10)
    const limitInt = parseInt(limit, 10)

    // Validate that the order is one of the valid fields
    const allowedOrderFields = ['createdAt', 'nombre', 'spots', 'contact', 'parkingType']
    if (!allowedOrderFields.includes(order)) {
      return res.status(400).json({ error: 'The param order is not valid.' })
    }

    // Build the object options of the query
    const options = {
      offset: skipInt,
      limit: limitInt,
      order: [[order, orderDir]],
    }

    // Database query
    const { count, rows } = await Estacionamiento.findAndCountAll(options)

    // return the response
    return res.json({
      totalItems: count,
      data: rows,
    })
  } catch (error) {
    console.error('Error getting parking list:', error)
    res.status(500).json({ error: 'Internal Server Error.' })
  }
}

// Route to update the information of existing parking
const updateParkingLot = async (req, res) => {
  const { id } = req.params
  const { contact, spots } = req.body

  try {
    // Validate that the id is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'The ID must to be a number.' })
    }

    // Find parking by ID
    const parkingLot = await Estacionamiento.findByPk(id)

    // Check if parking exists
    if (!parkingLot) {
      return res.status(404).json({ error: 'Parking not found.' })
    }

    // Update editable fields
    if (contact !== undefined) {
      parkingLot.contact = contact
    }

    if (spots !== undefined) {
      // Business rule: Validate that the number of drawers is not less than 50
      if (spots < 50) {
        return res.status(400).json({ error: 'The number of drawers cannot be less than 50.' })
      }

      parkingLot.spots = spots
    }

    // Save changes to the database
    await parkingLot.save()

    // Return updated parking information
    res.json(parkingLot.toJSON())
  } catch (error) {
    console.error('Error updating parking:', error)
    res.status(500).json({ error: 'Internal Server Error.' })
  }
}

module.exports = { createParkingLot, getParkingLots, updateParkingLot }
