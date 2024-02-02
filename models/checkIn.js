//-------------------------- CHECKIN ---------------------
// Enumeration for parking types
const ParkingType = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  COURTESY: 'courtesy',
}

// Enumeration for user types
const UserType = {
  CORPORATE: 'corporate',
  PROVIDER: 'provider',
  VISITOR: 'visitor',
}

// Factory class for validation logic
class CheckInValidatorFactory {
  static createValidator(parkingType) {
    switch (parkingType) {
      case ParkingType.PUBLIC:
        return new PublicCheckInValidator()
      case ParkingType.PRIVATE:
        return new PrivateCheckInValidator()
      case ParkingType.COURTESY:
        return new CourtesyCheckInValidator()
      default:
        throw new Error('Invalid parking type')
    }
  }
}

// Base class for input validators
class CheckInValidator {
  validate() {
    throw new Error('validate method not implemented')
  }
}

// Validator for public parking lots
class PublicCheckInValidator extends CheckInValidator {
  validate() {
    // There are no validations for public parking
    return {
      success: true,
      message: 'Allowed entry',
    }
  }
}

// Validator for private parking lots
class PrivateCheckInValidator extends CheckInValidator {
  validate(userType, isWeekend) {
    if (userType === UserType.CORPORATE && !isWeekend) {
      return {
        success: true,
        message: 'Allowed entry',
      }
    } else {
      return {
        success: false,
        errorCode: 'PRIVATE_ACCESS_DENIED',
        message: 'Only corporate users can log in on business days',
      }
    }
  }
}

// Courtesy parking validator
class CourtesyCheckInValidator extends CheckInValidator {
  validate(userType, isWeekend) {
    if (userType === UserType.VISITOR && isWeekend) {
      return {
        success: true,
        message: 'Allowed entry',
      }
    } else {
      return {
        success: false,
        errorCode: 'COURTESY_ACCESS_DENIED',
        message: 'Only visitors can enter on weekends',
      }
    }
  }
}

// checkIn method used by the Factory to obtain the corresponding validator
function checkIn(parkingType, userType, isWeekend) {
  try {
    const validator = CheckInValidatorFactory.createValidator(parkingType)
    return validator.validate(userType, isWeekend)
  } catch (error) {
    return {
      success: false,
      errorCode: 'INVALID_PARKING_ID',
      message: 'Invalid Parking ID',
    }
  }
}

//-------------------------------------------------------------

module.exports = { checkIn }
