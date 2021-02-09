import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { links_list_reducer } from './reducers/LinkReducers';

const reducer = combineReducers({
        links_list: links_list_reducer
});

const middleware = [thunk];
const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(...middleware)));
export default store;