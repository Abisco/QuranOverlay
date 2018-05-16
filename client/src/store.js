import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
//import logger from "redux-logger";

import reducer_index from "./reducers/index.js"

//const middleware = applyMiddleware(promise(), thunk, logger);
const middleware = applyMiddleware(promise(), thunk);

export default createStore(reducer_index, middleware)