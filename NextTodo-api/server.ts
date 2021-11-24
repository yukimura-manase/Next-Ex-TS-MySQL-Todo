// 使用するモジュールの読み込み
const express = require('express');
const mysql = require('mysql');
const session = require('express-session'); // express専用のセッション機能を利用するためのモジュール
//const bcrypt = require("bcrypt"); // パスワードをハッシュ化するためのモジュール

//expressアプリの作成
const app = express();

// セッション機能の設定
const session_config = {
    secret: 'robotama', // 秘密キーとなるテキスト => 暗号化(ハッシュ化)の時に使用する
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours => 24 * 60 * 60 * 1000 = 86400000 (ミリ秒) = 24時間を指定
};

// app.useによる設定定義

app.use(session(session_config)); // セッション機能を利用する

app.use(express.static('public')); // 静的ファイルの利用

// CORSの解決！
app.use((req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

// app.useメソッドによる関数の組み込み => アプリケーションに必要な機能を組み込んでいる！
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // フォームの値を受け取るために必要な定型文

// mysqlとの接続設定
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'masahiro5271',
    database: 'ts_todo'
});

// Todo一覧を取得するget通信の設定
app.post(`/api/todolist/:id`, (req: { params: { id: any; }; }, res: { json: (arg0: any) => void; }) => {
    console.log('API通信起動！');

    console.log(req.params);
    console.log(typeof req.params.id);

    // const userId = req.session.userid; // セッションに保存されているuseridを格納する変数 userId
    // const auth = Boolean(userId);  // userIdに値が入れば、trueとなるログイン認証変数 auth

    // console.log(userId);
    // console.log(`isAuth:${auth}`);

    connection.query(`select * from todos where user_id = ?;`,
    [req.params.id],
    (error: any, results: any)=> {
        console.log(error);
        console.log(results);
        res.json(results); // JSON形式でレスポンスを返す！
    });
});

// TodoCreateからのpost通信 & 新規作成の処理
app.post('/api/create',(req: { body: { user_id: any; todo: any; detail: any; handler: any; date: any; start: any; }; }, res: { json: (arg0: any) => void; })=> {
    console.log('post通信！ Todo新規作成');
    console.log(req.body);
    // console.log(req.body.todo);

    const user_id = req.body.user_id;
    const todo = req.body.todo;
    const detail = req.body.detail;
    const handler = req.body.handler;
    const date = req.body.date;
    const start = req.body.start;

    connection.query(`insert into todos(user_id,todo,detail,handler,date,start) values('${user_id}', '${todo}', '${detail}', '${handler}', '${date}', '${start}');`,
        (error: any, results: any)=>  {
            console.log(error);
            console.log(results);
            //res.json(results); //resをjson形式で返す！
            //res.redirect('/');
        }
    );

    connection.query(`select * from todos where user_id = ?;`,
    [user_id],
    (error: any, results: any)=> {
        console.log(error);
        console.log(results);
        res.json(results); // JSON形式でレスポンスを返す！
    });

});

// todoの削除処理・通信
app.post(`/api/delete/:id`,(req: { params: { id: any; }; body: { user_id: any; }; }, res: { json: (arg0: any) => void; })=> {
    console.log('post通信！ Todo削除');
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.body.user_id);

    const user_id = req.body.user_id;

    //const id = req.params.id;

    connection.query(`delete from todos where id = ?`,
        [ req.params.id ],
        (error: any, results: any)=> {
            console.log(error);
            console.log(results);
            //res.json(results); //resをjson形式で返す！
        }
    );
    
    connection.query(`select * from todos where user_id = ?;`,
    [user_id],
    (error: any, results: any)=> {
        console.log(error);
        console.log(results);
        res.json(results); // JSON形式でレスポンスを返す！
    });

});

// todoの更新処理・通信
app.post(`/api/update/:id`,(req: { params: { id: any; }; body: { user_id: any; todo: any; detail: any; handler: any; date: any; start: any; }; }, res: { json: (arg0: any) => void; })=> {
    console.log('post通信！ Todo更新');
    console.log(req.params.id);

    const user_id = req.body.user_id;
    const todo = req.body.todo;
    const detail = req.body.detail;
    const handler = req.body.handler;
    const date = req.body.date;
    const start = req.body.start;

    connection.query(`update todos set todo='${todo}', detail='${detail}', handler='${handler}',date='${date}',start='${start}' where id = ?;`,
        [ req.params.id ],
        (error: any, results: any)=> {
            console.log(error);
            console.log(results);
            //res.json(results); //resをjson形式で返す！
        }
    );
    
    connection.query(`select * from todos where user_id = ?;`,
    [user_id],
    (error: any, results: any)=> {
        console.log(error);
        console.log(results);
        res.json(results); // JSON形式でレスポンスを返す！
    });

});

// user情報の新規登録
app.post(`/api/newuser`,(req: { body: { user: any; password: any; }; }, res: { json: (arg0: string) => void; })=> {
    console.log('post通信！ ユーザーの新規登録');
    console.log(req.body);

    const user = req.body.user;
    const password = req.body.password;

    connection.query(`select * from users where name = '${user}';`,(error: any, results: string | any[])=> {
        console.log(error);
        console.log(results);

        if(results.length !== 0){
            console.log('このユーザー名は使用されています！');
            let message = 'このユーザー名は使用されています！';
            res.json(message);
        } else if(results.length === 0){
            connection.query(`insert into users(name,password) values('${user}','${password}');`,(error: any, results: string)=>{
                console.log(error);
                console.log(results);
                console.log('ユーザー登録完了！');
                res.json(results); // JSON形式でレスポンスを返す！
            });
        };

    });


});

// userのログイン
app.get(`/api/userlogin`,(req: { query: { user: any; password: any; }; session: { user: any; password: any; }; }, res: { json: (arg0: string) => void; })=> {
    console.log('get通信！ ユーザー・ログイン');
    // console.log(req);
    // console.log(req.params);
    // console.log(req.body);
    console.log(req.query);

    const user = req.query.user;
    const password = req.query.password;

    // ログインのタイミングでセッションを生成する！
    req.session.user = user; // sessionオブジェクトにuserキーを設定 & 変数userを代入
    req.session.password = password; // sessionオブジェクトにpasswordキーを設定 & 変数passwordを代入

    console.log(req.session);

    connection.query(`select * from users where name = '${user}' and password = '${password}';`,(error: any, results: any)=> {

        console.log(error);
        console.log(results);

        if(results.length !== 0){ // ユーザー登録があったら、resultsにはデータが入る
            console.log('ユーザーログイン実行！');
             
            // let session_data = {
            //     session_user: req.session.user,
            //     session_password: req.session.password
            // };
            // console.log(session_data);

            res.json(results); // JSON形式でレスポンスを返す！ => { results, session_data } (key:value 同一形)を返す！

        } else if( results.length === 0 ) {
            console.log('ユーザー登録がありません！');
            res.json('ユーザー登録がありません！');
        };

    });

});


// アクセスするとエラーを発生させるエラー関数
app.get('/error', (req: any, res: any) => {
    throw new Error('test');
});

app.use((err: any, req: any, res:any, next:any) => {
    console.error(err.stack);
    res.status(500).send(`<html><body style=" text-align: center; " ><h1>APIサーバーにてエラーが発生しました！！</h1><img src="/ロボ玉.jpg" alt="ロボ玉" style=" width: 900px; height: 600px; " /><p>${err.stack}</p></body></html>` );
});

// 指定パス以外のレスポンス
app.get('/*', (req: any, res: any)=> {
    res.send( `<html><body style=" text-align: center; " ><h1>Expressで作成するAPIサーバー・ロボ玉</h1><img src="/ロボ玉.jpg" alt="ロボ玉" style=" width: 1200px; height: 800px; " /><h2>送るべきデータがないので困惑するAPIサーバー・ロボ玉</h2></body></html>` );
});



// 待ち受け状態の設定
app.listen(8000, () => {
  console.log(`listening on port ${8000}`);
});




