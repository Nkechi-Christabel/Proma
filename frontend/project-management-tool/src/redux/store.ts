import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

export interface InitialState {
  userInfo?: any;
  projects?: any;
}

const initialState: InitialState = {};

const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware)
//     // (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//     //   (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any) &&
    //   (window.__REDUX_DEVTOOLS_EXTENSION_() as any)
  )
);

const persistor = persistStore(store);

export { store, persistor };
