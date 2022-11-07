export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => {
  const response = JSON.parse(localStorage.getItem(key));
  return response;
};
