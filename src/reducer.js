import React, {useReducer} from "react";
import {
  HANDLE_SHOW_CONNECT_MODAL,
  HANDLE_MY_NFTS_MODAL,
  HANDLE_WEB3_CONTEXT
} from "./const";

const mainContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_SHOW_CONNECT_MODAL:
      return {...state, showConnectModal: action.showConnectModal}
    default:

      return state
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, {
    showConnectModal: false,
  });
  return (
      <mainContext.Provider value={{state, dispatch}}>
        {props.children}
      </mainContext.Provider>
  );
};

export {reducer, mainContext, ContextProvider};
