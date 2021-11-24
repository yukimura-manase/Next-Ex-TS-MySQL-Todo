import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stateType, submitUserType } from "../components/PageTypes";
import { setLoginUser } from "../redux/ActionCreator";
import { useRouter } from "next/router";
import axios from "axios";
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles( ()=> {
    return createStyles({
        "text":{
            textAlign:"center",
            fontWeight:600
        },
        "title":{
            width:"100%",
            textAlign:"center",
            color:"#3399FF",
            fontSize:"40px"
        },
        "button": {
            borderColor: "#3399FF",
            color: "#3399FF",
            fontWeight: 600,
            marginTop: "12px",
            marginRight: "12px",
            marginLeft:"12px",
            marginBottom: "12px",
            backgroundColor: "white",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#3399FF",
                color: "white"
            }
        },
        "h3":{
            fontSize:"25px"
        },
        "input": {
            width: "30%",
        },
        "serverMsg": {
            color: "blue",
            margin: "30px",
            fontSize:"25px"
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

const loginUserSelector = (state: stateType)=> {
    return state.StoreState.user;
};


const User = ()=> {

    const classes = useStyle();

    const user = useSelector(loginUserSelector);

    const dispatch = useDispatch();

    const router = useRouter();

    const [ userName, setUser ] = useState<string>('');
    const inputUser = (e:React.ChangeEvent<HTMLInputElement>)=>{
        //console.log(e.target.value);
        setUser(e.target.value);
    };

    const [ pass, setPass ] = useState<string>('');
    const inputPass = (e:React.ChangeEvent<HTMLInputElement>)=>{
        //console.log(e.target.value);
        setPass(e.target.value);
    };

    const [ pass2, setPass2 ] = useState<string>('');
    const inputPass2 = (e:React.ChangeEvent<HTMLInputElement>)=>{
        //console.log(e.target.value);
        setPass2(e.target.value);
    };

    // サーバー側からのユーザーデータ登録状況の結果メッセージ
    const [msg, setMsg] = useState<string>('');

    // ユーザー名のバリデーション
    const inputUserValidate = (userName: string)=> {
        let pattern = /^[\s\S\d]{1,20}$/  // 正規表現パターン(法則性)の作成  //「行頭から行末まで文字列・数字が1文字以上20以内のパターン」
        return pattern.test(userName);
    };

    const inputPassValidate = (pass: string)=> {
        let pattern = /^[\s\S\d]{1,20}$/  // 正規表現パターン(法則性)の作成  //「行頭から行末まで文字列・数字が1文字以上20以内のパターン」
        return pattern.test(pass);
    };

    const [ errors, setError ] = useState<string[]>([]);

    // userのログイン
    const login = ()=> {
        //console.log('ログイン処理起動！');

        setMsg('');

        let errorlist = [];

        if(userName === ''){
            errorlist.push('ユーザー名が入力されていません');
        } else if(!inputUserValidate(userName)){
            errorlist.push('ユーザー名は、1文字以上20文字以内で入力をしてください');
        };

        if(pass === ''){
            errorlist.push('パスワードが入力されていません');
        } else if(!inputPassValidate(pass)){
            errorlist.push('パスワードは、1文字以上20文字以内で入力をしてください');
        };

        if(pass2 === ''){
            errorlist.push('パスワードが再入力されていません');
        };

        if( pass !== pass2){
            errorlist.push('パスワードが一致しません');
        };

        setError(errorlist);

        //console.log(errorlist);

        const server = `http://localhost:8000/api/userlogin`;
        
        if(errorlist.length === 0){

            const submitUser: submitUserType = {
                user: userName,
                password: pass
            };
            //console.log(submitUser);

            axios.get(server,{params:submitUser})
                .then( (response: any)=> {
                    //console.log(response);
                    //console.log(...response);
                    //console.log(response.data);
                    //console.log(...response.data);
                    //console.log(response.config.params);

                    if(response.data === 'ユーザー登録がありません！'){
                        alert('ユーザー登録がありません！');
                        setMsg('ユーザー登録がありません！');
                    } else {
                        let axiosUserData:any = response.data.shift();
                        //console.log(axiosUserData);

                        dispatch(
                            setLoginUser(axiosUserData)
                        );
                        //console.log('ログイン処理完了');

                        router.push('/');
                    };
                    
                })
                .catch( (error)=>{
                    console.log(error);
                });
        };
        
    };


    // userの新規登録
    const newUser = ()=> {
        //console.log('新規登録の処理、起動！');

        setMsg('');

        let errorlist = [];

        if(userName === ''){
            errorlist.push('ユーザー名が入力されていません');
        } else if(!inputUserValidate(userName)){
            errorlist.push('ユーザー名は、1文字以上20文字以内で入力をしてください');
        };

        if(pass === ''){
            errorlist.push('パスワードが入力されていません');
        } else if(!inputPassValidate(pass)){
            errorlist.push('パスワードは、1文字以上20文字以内で入力をしてください');
        };

        if(pass2 === ''){
            errorlist.push('パスワードが再入力されていません');
        };

        if(pass !== pass2){
            errorlist.push('パスワードが一致しません');
        };

        setError(errorlist);

        const server = `http://localhost:8000/api/newuser`;
        
        if(errorlist.length === 0){

            const submitUser: submitUserType = {
                user: userName,
                password: pass
            };
            //console.log(submitUser);

            axios.post(server,submitUser)
                .then( (response: any)=> {

                    //console.log(response);

                    if(response.data === 'このユーザー名は使用されています！'){
                        alert('このユーザー名は使用されています！');
                        setMsg('このユーザー名は使用されています！');
                    } else {
                        alert('新規登録完了！ ログインをしてください！');
                        setMsg('新規登録完了！ ログインをしてください！');
                    };

                })
                .catch( (error)=>{
                    console.log(error);
                });
        };

    };



    return (
        <div className={ classes.text} >

            <h2 className={ classes.title } >ユーザーログイン・新規登録画面</h2>

            <h3 className={ classes.h3} >ユーザー名</h3>
            <input required type="text" placeholder='ユーザー名を入力' aria-required onChange={ (e)=>{inputUser(e)} } className={ classes.input } />
            <h3 className={ classes.h3} >パスワード</h3>
            <input required type="password" placeholder='パスワードを入力' aria-required onChange={ (e)=>{inputPass(e)} } className={ classes.input } />
            <h3 className={ classes.h3} >パスワード再入力</h3>
            <input required type="password" placeholder='パスワードを再入力' aria-required onChange={ (e)=>{inputPass2(e)} } className={ classes.input } />

            <div className={ classes.serverMsg } >{msg}</div>

            <div>
                <button onClick={ ()=>{ login() } } className={ classes.button } >ログイン</button>
                <button onClick={ ()=>{ newUser() } } className={ classes.button } >新規登録</button>
            </div>
            <div>{errors.map( (error, index)=> {
                return (
                    <React.Fragment key={index} >
                        <h4 className={classes.error1} >入力エラー{index + 1}</h4>
                        <h5 className={ classes.error2 } >{error}</h5>
                    </React.Fragment>
                )
            })
            }</div>
            
        </div>
    );
};

export default User;