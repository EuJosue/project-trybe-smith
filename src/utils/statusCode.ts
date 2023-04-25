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

export default (type: string) => statusCodeString(type)
  || statusCodeNumber(type)
  || (type.includes('any.required') && 400)
  || 500;