import { createStore, Store } from 'redux';
import { IState } from './state';
import reducer from './reducers';

export default (): Store<IState> => createStore(reducer);
