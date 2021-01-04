import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducers from './reducers';
import {createSocketMiddleware} from './services/Socket';

const sagaMiddleware = createSagaMiddleware();
const socketMiddlewar = createSocketMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware, socketMiddlewar)),
);

sagaMiddleware.run(sagas);

export default store;
