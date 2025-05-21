import { createStore, applyMiddleware } from "redux";
// import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../reducers";
import { thunk } from "redux-thunk";

//we are not using redux toolkit
const store = createStore(rootReducer, applyMiddleware(thunk)); // -> deprecated

// const store = configureStore({
//   reducer: rootReducer, 
// });

export default store;
