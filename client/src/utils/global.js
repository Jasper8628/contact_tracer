import React, { createContext, useReducer, useContext } from "react";
const NewContext = createContext();
const { Provider } = NewContext;

const reducer = (state, action) => {
  switch (action.type) {
    case 'info':
      return {
        ...state,
        item: action.item
      }
    case 'set':
      return {
        ...state,
        colors: action.color,
        shopColor: action.shopCol
      }
    case 'reset':
      return {
        ...state,
        item: {
          dates: []
        }
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
    secondContacts: [],
    item: {
      dates: []
    }
  }
  );
  return <Provider value={[global, dispatch]} {...props} />
}
const useNewContext = () => {
  return useContext(NewContext);
};
export { ContextProvider, useNewContext }
