export type apiTodo = [
    {
        id:number,
        user_id:number,
        todo:string,
        detail:string,
        handler:string,
        date:string,
        start:string
    }
];

export type userType = {
    id: number,
    name: string,
    password: string
};

export type actions = { // actionが受け取るデータの型を定義しておく！
    type: string,
    apitodo : apiTodo,
    userdata: userType
};

export type storeStateType = {
    user: {
        id: number,
        name: string,
        password: string
    } | null
    todolist:[
        { id: number, user_id:number, todo: string, detail:string, handler: string, date: string, start: string }
    ] | []
};