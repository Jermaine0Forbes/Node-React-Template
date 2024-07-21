
export const toJson = (val) => JSON.stringify(val);

export const parse = (val) => JSON.parse(val);

export const compare = (list1, list2) => JSON.stringify(list1) === JSON.stringify(list2);