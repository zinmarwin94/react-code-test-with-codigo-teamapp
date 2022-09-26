import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxPromise from 'redux-promise';    
import localForage from "localforage";
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';

import App from "./App";
import reducers from "./reducers";
import { saveState } from './localStorage';
 
const actionSanitizer = () => { }

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionSanitizer,
    stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
  }) : compose;      

const persistConfig = {
  key: 'player_list',
  storage,
  whitelist: [
    'player_list', 
  ],
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducers)

var enhancer = null
enhancer = composeEnhancers(
  applyMiddleware(ReduxPromise)  
);


const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store)

localForage.config({
  driver      : localForage.INDEXEDDB, 
  name        : 'codigo',
  version     : 1.0,
  size        : 4980736, 
  storeName   : 'player_list',
  description : 'some description'
});

store.subscribe(()=> {
  saveState({
    player_list: store.getState().player_list, 
  });
})

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
   
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
