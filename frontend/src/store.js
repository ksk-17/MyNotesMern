import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userRegistrationReducer } from "./reducers/userReducer";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducers/notesReducer";

const reducer = combineReducers({
    //this will contain our reducers
    userLogin: userLoginReducer,
    userRegistration: userRegistrationReducer,
    noteList: noteListReducer,
    noteCreate:noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem("userInfo")):null;

const initialState={
    userLogin: {userInfo: userInfoFromLocalStorage},
};

const middleware=[thunk];

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;