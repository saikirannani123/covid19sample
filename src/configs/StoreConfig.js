import  thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {applyMiddleware, createStore,compose} from 'redux'
import {RootReducer} from '../reducers'

const logger = createLogger();
let  StoreConfig = createStore(
    RootReducer, compose(applyMiddleware(thunk, logger))
);
export default StoreConfig;