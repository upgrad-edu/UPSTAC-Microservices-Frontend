import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {logger} from "redux-logger"
import storage from 'redux-persist/lib/storage'
import reducers from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};
// ,
// stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
const pReducer = persistReducer(persistConfig, reducers);

const middlewares = [thunk, logger];
const enhancer = applyMiddleware(...middlewares);


export const store = createStore(pReducer, enhancer);
export const persistor = persistStore(store);

