import {combineReducers} from 'redux';
import auth, {LOGOUT} from '../auth/authStore';
import authority from '../authority/store/authorityStore';

const appReducer = combineReducers({
    auth,
    authority
})

export default (state, action) => {
    const appState = action.type === LOGOUT ? undefined : { ...state }
    return appReducer(appState, action)
}
