import React, { createContext, useReducer, useContext } from "react";
const NewContext = createContext();
const { Provider } = NewContext;

const reducer = (state, action) => {
  switch (action.type) {
    case 'zero':
      return {
        ...state,
        zero: action.lineZero
      };
    case 'lineClose':
      return {
        ...state,
        closeContacts: action.lineClose
      };
    case 'secShop':
      return {
        ...state,
        secondShops: action.lineShop
      };
    case 'secContact':
      return {
        ...state,
        secondContacts: action.lineSecond
      };
    case 'set':
      return {
        ...state,
        colors: action.color,
        shopColor: action.shopCol
      }

    default:
      break;
  }
};
const ContextProvider = ({ value = 0, ...props }) => {
  const [global, dispatch] = useReducer(
    reducer, {
    colors: {},
    shopColor: {},
    zero: [],
    closeContacts: [],
    secondShops: [],
    secondContacts: []
  }
  );
  return <Provider value={[global, dispatch]} {...props} />
}
const useNewContext = () => {
  return useContext(NewContext);
};
export { ContextProvider, useNewContext }
