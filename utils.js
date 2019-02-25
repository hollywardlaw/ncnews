exports.getDate = (array) => {
  const newArray = [...array];
  newArray.map((object) => {
    const timestamp = object.created_at;
    const date = new Date(timestamp);
    object.created_at = date;
  });
  return newArray;
};
