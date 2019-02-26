exports.getDate = (array) => {
  const newArray = [...array];
  newArray.map((object) => {
    const timestamp = object.created_at;
    const date = new Date(timestamp);
    object.created_at = date;
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
  replacedArray.forEach((item) => {
    item[addKey] = refObject[item[deleteKey]];
    delete item[deleteKey];
    correctArray.push(item);
  });

  return correctArray;
};

exports.createAuthor = (array) => {
  const copyArray = [...array];
  copyArray.map((object) => {
    object.author = object.created_by;
    delete object.created_by;
  });
  return copyArray;
};
