import { ADDNEWTODO, REMOVETODO, FEACHTODO, UPDATETODO, SETLOGINUSER, DELETELOGINUSER } from './ActionCreator';
import { storeStateType, actions } from './ReduxTypes';

let initialState: storeStateType = {
    user: null,
    todolist: []
};

export default (state = initialState, action: actions)=> {

    switch(action.type){
        case FEACHTODO: {
            return { ...state, todolist:action.apitodo};
        }
        case ADDNEWTODO: {
            return { ...state, todolist:action.apitodo };
        }
        case REMOVETODO: {
            return { ...state, todolist:action.apitodo };
        }
        case UPDATETODO: {
            return { ...state, todolist:action.apitodo };
        }
        case SETLOGINUSER: {
            return { ...state, user:action.userdata };
        }
        case DELETELOGINUSER: {
            return { ...state, user:null };
        }
        default: return state;
    };

};