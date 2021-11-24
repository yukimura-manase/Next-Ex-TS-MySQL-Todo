import Link from 'next/link';
import React from 'react';
import { createStyles,makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { stateType } from './PageTypes';
import { deleteLoginUser } from '../redux/ActionCreator';
import { useRouter } from 'next/router';

// スタイルの関数
const useStyle = makeStyles( () => {
    return createStyles(
        {
            "right":{
            textAlign:"left",
            },
            "buttonStyle":{
                fontWeight:700,
                fontSize:"25px",
                color: "white",
                borderColor: "#3399FF",
                backgroundColor:"#3399FF",
                margin:"5px 5px",
                outline: "none", /* クリックしたときに表示される枠線を消す */
                background:"transparent", /* 背景の灰色を消す */
                "&:hover":{
                backgroundColor:"white",
                color:"#3399FF"
                }
            },
        }
    )
});

const loginUserSelector = (state: stateType)=> {
    return state.StoreState.user;
};

const Nav = ()=> {
    const classes = useStyle();

    const user = useSelector(loginUserSelector);

    const dispatch = useDispatch();

    const router = useRouter();

    const logout = ()=> {
        dispatch(deleteLoginUser());
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('pass');
        //console.log('ログアウト');
        router.push('/user');
    };

    return (
        <div className={ classes.right } >
            <Link href='/'><button className={ classes.buttonStyle } >Todo一覧へ</button></Link>
            <Link href='/create'><button className={ classes.buttonStyle } >Todo作成へ</button></Link>
            { user === null ? <button onClick={ ()=>{ router.push('/user') } } className={classes.buttonStyle} >ログイン・新規登録画面</button> : false }
            { user === null ? true : <button onClick={ ()=>{ logout() } } className={classes.buttonStyle} >ログアウト</button> }
        </div>
    );
};

export default Nav;