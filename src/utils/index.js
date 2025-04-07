
export const empty = (val) => {
  return !!( typeof val === "null" || typeof val === "undefined" || val === false
    || val === 0 || val.length === 0
  );
}

export const toJson = (val) =>{ 

  if( Array.isArray(val)){
    return val.map(e => JSON.stringify(e))
   } else if (typeof val === "string") {
     return val;
   }
  return JSON.stringify(val)
};

export const parse = (val) => {

   if( Array.isArray(val)){
    return val.map(e =>{ 
      // regex expression to detect all types of brackets
      // if it detects them, then it will parse
      const rx = /\[[^\]]+\]|\{[^}]+\}|<[^>]+>/;
      if(rx.test(e)){
        return JSON.parse(e)
      }
      return e;
    })
   }

   return JSON.parse(val)
};

export const json = (value) =>  typeof value === "object" ? toJson(value) : parse(value);

export const getRandBtwn = (begin, end) => {
    return Math.ceil(Math.random() * end) + begin;

};

export const getKey = (key) => {
  const endKey = Date.now()* key;
  return getRandBtwn(key, endKey);
}

