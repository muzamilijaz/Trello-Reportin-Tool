export const countUp = val => {
  return {
    type: "COUNT_UP",
    value: val
  };
};
export const countDown = val => {
  return {
    type: "COUNT_DOWN",
    value: val
  };
};
export const conditonalCallback = val => {
  return {
    type: "CALLBACK",
    value: val
  };
};

export const handleParent = () => {
  return {
    type: 'COUNT_T0_1000',
  }
}