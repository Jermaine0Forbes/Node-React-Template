export const json = (value) =>  typeof value === "object" ? JSON.stringify(value) : JSON.parse(value);

export const toJson = (val) => JSON.stringify(val);

export const parse = (val) => JSON.stringify(val);

export const getRandBtwn = (begin, end) => {
    return Math.ceil(Math.random() * end) + begin;

};

export const getKey = (key) => {
  const endKey = Date.now()* key;
  return getRandBtwn(key, endKey);
}

