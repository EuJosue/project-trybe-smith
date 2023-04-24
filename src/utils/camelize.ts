// const snakeize = (string: string) => string.replace(/([A-Z]+)/gm, (char) => `_${char.toLowerCase()}`);

const camelize = (string: string) => string.replace(/_([a-z])/gm, (char) => char[1].toUpperCase());

export const camelizeKeys = (object: { [param: string]: unknown }): unknown => {
  const newObject: { [para:string]: unknown } = {};

  Object.keys(object).forEach((key) => {
    newObject[camelize(key)] = object[key];
  });

  return newObject;
};