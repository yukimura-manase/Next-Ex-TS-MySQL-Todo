export const FEACHTODO = 'feachtodo';
export const ADDNEWTODO = 'addNewTodo';
export const REMOVETODO = 'removeTodo';
export const UPDATETODO = 'updateTodo';
export const SETLOGINUSER = 'setLoginUser';
export const DELETELOGINUSER = 'deleteLoginUser';

import { apiTodo, userType } from "./ReduxTypes";

export const feachTodo = (apitodo:apiTodo)=> {
    return {
        type:FEACHTODO,
        apitodo:apitodo
    };
};

export const addNewTodo = (apitodo: apiTodo)=> {
    return {
        type:ADDNEWTODO,
        apitodo:apitodo
    };
};

export const removeTodo = (apitodo: apiTodo)=> {
    return {
        type:REMOVETODO,
        apitodo: apitodo
    };
};

export const updateTodo = (apitodo: apiTodo)=> {
    return {
        type:UPDATETODO,
        apitodo: apitodo
    };
};

export const setLoginUser = (userdata: userType)=> {
    return {
        type:SETLOGINUSER,
        userdata :userdata
    };
};

export const deleteLoginUser = ()=> {
    return {
        type:DELETELOGINUSER
    };
};
