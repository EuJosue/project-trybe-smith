const statusCodeString = (type: string) => {
  switch (type) {
    case 'string.min':
    case 'string.base':
      return 422;
    default:
      return false;
  }
};

const statusCodeNumber = (type: string) => {
  switch (type) {
    case 'number.base':
    case 'number.min':
      return 422;
    default:
      return false;
  }
};

const statusCodeArray = (type: string) => {
  switch (type) {
    case 'array.includesRequiredUnknowns':
    case 'array.base':
      return 422;
    default:
      return false;
  }
};

const statusCodeTypes = (type: string) => statusCodeString(type)
  || statusCodeNumber(type)
  || statusCodeArray(type)
  || false;

export default (type: string) => statusCodeTypes(type)
  || (type.includes('any.required') && 400)
  || 500;