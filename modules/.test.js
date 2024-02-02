const { getParkingLots, updateParkingLot, createParkingLot } = require('./parkingLotModule');
const Estacionamiento = require('../models/Estacionamiento');

// Express Mock
const mockRequest = (query = {}, params = {}, body = {}) => ({
  query,
  params,
  body
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getParkingLots Function', () => {
  it('should return a paginated parking array', async () => {
    const req = mockRequest({ skip: '0', limit: '10', order: 'createdAt' });
    const res = mockResponse();

    // Parking.findAndCountAll function mockup
    jest.spyOn(Estacionamiento, 'findAndCountAll').mockResolvedValue({
      count: 20,
      rows: [
        { id: 1, nombre: 'Parking 1', spots: 50, contact: 'contact1@example.com', parkingType: 'Outdoor' },
        { id: 2, nombre: 'Parking 2', spots: 100, contact: 'contact2@example.com', parkingType: 'Indoor' }
      ]
    });

    await getParkingLots(req, res);

    // Verifies that the json method was called with the expected result
    expect(res.json).toHaveBeenCalledWith({
      totalItems: 20,
      data: [
        { id: 1, nombre: 'Parking 1', spots: 50, contact: 'contact1@example.com', parkingType: 'Outdoor' },
        { id: 2, nombre: 'Parking 2', spots: 100, contact: 'contact2@example.com', parkingType: 'Indoor' }
      ]
    });

    // Restore the original implementation of Parking.findAndCountAll after testing
    jest.restoreAllMocks();
  });
});

describe('updateParkingLot Function', () => {
    it('should handle validation errors for spots', async () => {
      const id = '1'; // Asegúrate de que id sea una cadena numérica aquí
      const req = mockRequest({
        params: { id },
        body: { spots: 25 }
      });
      const res = mockResponse();
  
      // Mock of Parking.findByPk function
      jest.spyOn(Estacionamiento, 'findByPk').mockResolvedValue(null);
  
      await updateParkingLot(req, res);
  
      // Verifies that the json method was called with the expected result
      expect(res.json).toHaveBeenCalledWith({ error: 'The ID must to be a number.' });
  
      // Restore the original implementation of Parking.findByPk after testing
      jest.restoreAllMocks();
    });
  });