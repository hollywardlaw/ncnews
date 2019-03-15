exports.getDate = (array) => {
  const newArray = array.map((object) => {
    const timestamp = object.created_at;
    const newObject = { ...object, created_at: new Date(timestamp) };
    return newObject;
  });
  return newArray;
};

exports.createRef = (dataArray, key1, key2) => {
  const dataObject = dataArray.reduce(
    (acc, data) => ({ [data[key1]]: data[key2], ...acc }),
    {},
  );
  return dataObject;
};

exports.replaceTitlesWithID = (dataArray, refObject, deleteKey, addKey) => {
  const replacedArray = [...dataArray];
  const correctArray = [];
  replacedArray.forEach((original) => {
    const item = { ...original };
    item[addKey] = refObject[item[deleteKey]];
    delete item[deleteKey];
    correctArray.push(item);
  });

  return correctArray;
};

exports.createAuthor = array => array.map((original) => {
  const object = { ...original };
  object.author = object.created_by;
  delete object.created_by;
  return object;
});
