import React,{ useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector ,useDispatch } from 'react-redux';
import { addNewTodo } from '../redux/ActionCreator';
import { submitTodo, stateType } from '../components/PageTypes';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(()=>{
    return createStyles({
        "title":{
            width:"100%",
            textAlign:"center",
            color:"#3399FF",
            fontSize:"40px"
        },
        "text":{
            textAlign:"center",
            fontWeight:600
        },
        "tableWidth":{
            width:"80%",
            margin:"3px auto",
            paddingTop:"30px",
            paddingBottom:"30px",
            // border:"solid 3px",
            // borderColor: "#3399FF",
        },
        "h3":{
            fontSize:"25px"
        },
        "button": {
            borderColor: "#3399FF",
            color: "#3399FF",
            fontWeight: 600,
            marginTop: "20px",
            marginRight:"8px",
            marginBottom: "8px",
            backgroundColor: "white",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#3399FF",
                color: "white"
            }
        },
        "input": {
            width: "30%",
        },
        "error1": {
            color:"black",
            fontSize:"22px"
        },
        "error2": {
            color:"blue",
            fontSize:"20px"
        }

    });
});

const todoSelector = (state: stateType)=> {
    return state.StoreState.todolist;
};

const loginUserSelector = (state: stateType)=> {
    return state.StoreState.user;
};

const TodoCreate = ()=> {

    const classes = useStyle();

    const todolist = useSelector(todoSelector);

    const user = useSelector(loginUserSelector);

    const router = useRouter();

    const dispatch = useDispatch();

    const [inputtodo, setTodo] = useState<string>('');
    const [inputdetail, setDetail] = useState<string>('');
    const [inputhandler, setHandler] = useState<string>('');
    const [inputlimit, setLimit] = useState<string>('');
    const [inputstart, setStart] = useState<string>('');

    const inputTodo = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setTodo(e.target.value);
    };

    const inputDetail = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setDetail(e.target.value);
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setHandler(e.target.value);
    };

    const inputLimit = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setLimit(e.target.value);
    };

    const inputStart = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setStart(e.target.value);
    };

     // チケット名のバリデーション
     const inputTodoValidate = (inputtodo: string)=> {
        let pattern = /^[\s\S\d]{1,20}$/  // 正規表現パターン(法則性)の作成  //「行頭から行末まで文字列・数字が1文字以上20以内のパターン」
        return pattern.test(inputtodo)
    }

    // 詳細内容のバリデーション
    const inputDetailValidate = (inputdetail: string)=> {
        let pattern = /^[\s\S\d]{1,300}$/
        return pattern.test(inputdetail)
    }

    // 担当者のバリデーション
    const inputHandlerValidate = (inputhandler: string)=> {
        let pattern = /^[\s\S\d]{1,10}$/
        return pattern.test(inputhandler)
    }

    // 期日のバリデーション
    const inputDateValidate = (inputlimit: string)=>{

        //console.log('期日のバリデーション');

        let today = new Date(); // 現在時刻の取得 => Dateオブジェクトを呼び出す！
        //console.log(today);

        let today2: any = new Date( // 「年・月・日」までの日付情報(文字列)を生成する！
            today.getFullYear(), //年
            today.getMonth(), //月
            today.getDate() //日
        );

        let nowDay = Date.parse(today2);
        //console.log(nowDay);

        //console.log(inputdate);
        let limitDate: any = new Date(inputlimit);
        //console.log(limitDate);

        let limitDay = Date.parse(limitDate);
        //console.log(limitDay);

        //console.log(limitDay - nowDay);

       if(limitDay - nowDay >= 0){
            return true;
       } else {
           return false;
       };

    }

    // 開始日のバリデーション
    const inputStartValidate = (inputstart: string): boolean => {

        //console.log('開始日のバリデーション');

        let today: Date = new Date(); // 現在時刻の取得 => Dateオブジェクトを呼び出す！

        let today2: Date = new Date( // 「年・月・日」までの日付情報(文字列)を生成する！
            today.getFullYear(), //年
            today.getMonth(), //月
            today.getDate() //日
        );

        let nowDay: number = Number(today2);
        //console.log(nowDay);

        let startDate: Date = new Date(inputstart);

        let startDay: number = Number(startDate);
        //console.log(startDay);
        
        //console.log(startDay - nowDay);
       if(startDay - nowDay >= 0){
            return true;
       } else {
           return false;
       };

    };

    const compareLimitStart = (inputlimit: string, inputstart: string)=> {

        //console.log('期日と開始日のバリデーション');
        
        let limitDate = new Date(inputlimit);

        let limit = Number(limitDate);
        //console.log(limit);

        let startDate = new Date(inputstart);

        let start = Number(startDate);
        //console.log(start);

        //console.log(limit - start);
        if(limit - start >= 0){
            return true;
        } else {
            return false;
        };


    };

    const [errors, setError] = useState<string[]>([]) // string型の配列が入るよと型定義

    // バリデーション・チェック
    const submitTask = ()=>{

        setError([]) // 初期化

        let errorlist: string[] = []

        if(inputtodo === ''){
            errorlist.push('チケット名を入力してください')
        } else if( !inputTodoValidate(inputtodo) ){ // マッチしなかったら実行
            errorlist.push('チケット名は、1文字以上20文字以内で入力をしてください')
        }

        if(inputdetail === ''){
            errorlist.push('詳細内容を入力してください')
        } else if( !inputDetailValidate(inputdetail) ){ // マッチしなかったら実行
            errorlist.push('詳細内容は、1文字以上300文字以内で入力をしてください')
        }

        if(inputhandler === ''){
            errorlist.push('担当者を入力してください')
        } else if( !inputHandlerValidate(inputhandler) ){ // マッチしなかったら実行
            errorlist.push('担当者は、1文字以上10文字以内で入力をしてください')
        }

        if(inputlimit === ''){
            errorlist.push('期日を選択してください')
        } else if( !inputDateValidate(inputlimit) ) { // マッチしなかったら実行
            errorlist.push('期日は、今日以降の日付にしてください')
        }

        if(inputstart === ''){
            errorlist.push('開始日を選択してください') 
        } else if( !inputStartValidate(inputstart) ) { // マッチしなかったら実行
            errorlist.push('開始日は、今日以降の日付にしてください')
        };

        if(inputlimit === '' || inputstart === ''){
            console.log('ロボ玉');
        } else if( !compareLimitStart(inputlimit, inputstart) ){ // falseが返ってきたら実行する！
            errorlist.push('期日は、開始日以降の日付にしてください');
        };

        setError(errorlist); // セットされたエラー情報がリアルタイムで表示される！

        const server = 'http://localhost:8000/api/create';

        if(errorlist.length === 0){

            const submitData: submitTodo = {
                user_id: user.id,
                todo: inputtodo,
                detail: inputdetail,
                handler: inputhandler,
                date: inputlimit,
                start: inputstart
            };
            console.log(submitData);

            axios.post(server, submitData)
                .then(response => {

                    let axiosData:any = [];
                
                    axiosData.push(...response.data);

                    dispatch(
                        addNewTodo(axiosData)
                    );

                })
                .catch( (error)=>{
                    console.log(error);
                });

            router.push('/'); // router.pushで動的ページ遷移！
        };
    };


    return (
        <React.Fragment>

            { user === null ? <h2 className={ classes.title} >まずはログイン</h2> :
                <div className={ classes.text}>
                    
                    <h2 className={ classes.title} >Todo作成画面</h2>

                    <table className={ classes.tableWidth } >
                        <tbody>
                            <tr>
                                <td>
                                    <h3 className={ classes.h3 } >チケット名</h3>
                                    <input value={inputtodo} placeholder='チケットのタイトル' onChange={(event)=>{ inputTodo(event) }} className={ classes.input } />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3 className={ classes.h3 }  >チケット詳細</h3>
                                    <textarea value={inputdetail} placeholder='タスクの詳細' onChange={(event)=>{ inputDetail(event) }} className={ classes.input } />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3 className={ classes.h3 }  >担当者</h3>
                                    <input value={inputhandler} placeholder='担当者を入力' onChange={(event)=>{ inputHandler(event) }} className={ classes.input } />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3 className={ classes.h3 }  >期日(Todoの期限を設定してください)</h3>
                                    <input type='date' value={inputlimit} onChange={(event)=>{ inputLimit(event) }} className={ classes.input } />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3 className={ classes.h3 }  >開始日</h3>
                                    <input type='date' value={inputstart} onChange={(event)=>{ inputStart(event) }} className={ classes.input } />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={ ()=>{submitTask()} } className={ classes.button } >Todoチケット作成</button>
                                    <Link href='/'><button className={ classes.button } >Todo一覧に戻る</button></Link>
                                    <div>
                                        {errors.map(
                                            (error,index)=> {
                                                return (
                                                    <div key={index}>
                                                        <h4 className={classes.error1} >入力エラー{index + 1}</h4>
                                                        <h5 className={classes.error2} >{error}</h5>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            
        </React.Fragment>
    );
};

export default TodoCreate;