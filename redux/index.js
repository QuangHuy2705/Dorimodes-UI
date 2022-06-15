import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducers from './reducers'
import rootSagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducers, undefined, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSagas)

export default store
