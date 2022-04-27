module.exports = {
  EMAIl: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
  // PASSWORD: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  PASSWORD: new RegExp(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  PHONE: new RegExp(/^[\d+()-]*$/),
  NAME: new RegExp(/[a-zA-Z ,.'-]{2,50}$/),
};
