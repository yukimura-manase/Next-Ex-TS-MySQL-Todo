// 型定義をまとめておくことで、データ構造がパッとみてわかりやすい！再利用がしやすい！

// 各コンポーネントがStoreStateから持ってくるデータ構造の定義 => データ構造が明確化される(見える化)！
export type stateType = {
    StoreState:{
      user: { id: number, name: string, password: string } | null ,
      todolist:[
        { id: number, user_id:number, todo: string, detail:string, handler: string, date: string, start: string }
      ] | []
    }
};

export type loginUser = { id: number, name: string, password: string } | null;

export type todoType = { id: number,  user_id:number, todo: string, detail:string, handler: string, date: string, start: string };

export type submitTodo = {
    user_id: number,
    todo: string,
    detail: string,
    handler: string,
    date: string,
    start: string
};

export type parameter = { id: string };

export type detailType = { id: number, todo: string, detail:string, handler: string, date: string, start: string };

export type submitUserType = {
  user: string,
  password: string
};



