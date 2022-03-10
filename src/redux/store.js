import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";

const initializeStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export const wrapper = createWrapper(initializeStore);
