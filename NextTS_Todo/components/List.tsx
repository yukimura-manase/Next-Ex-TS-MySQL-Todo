import Link from 'next/link';
import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../redux/ActionCreator';
import { useRouter } from 'next/router';
import axios from 'axios';
import { stateType, todoType } from './PageTypes';

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
        "tableWidth":{
            width:"80%",
            margin:"3px auto",
            paddingTop:"30px",
            paddingBottom:"30px",
            //border:"solid 3px",
            borderColor: "#3399FF",
        },
        "todoTitle":{
            background:"#3399FF",
            fontSize:"20px",
            color:"white",
            //border:"solid 3px",
            borderColor: "#3399FF"
        },
        "tableBody":{
            background:"#EEEEEE",
            //border:"solid 3px",
            borderColor: "#3399FF",
        },
        "button": {
            borderColor: "#3399FF",
            color: "#3399FF",
            fontWeight: 600,
            margin: "12px",
            backgroundColor: "white",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#3399FF",
                color: "white"
            }
        },
        // "todo_title": {
        //     fontSize: "12px",
        //     "&:hover": {
        //         color: "blue",
        //     }
        // }

    });
});

const todoSelector = (state: stateType)=> {
    return state.StoreState.todolist;
};

const loginUserSelector = (state: stateType)=> {
    return state.StoreState.user;
};

const TodoList = ()=> {

    const classes = useStyle();

    const router = useRouter();

    const user = useSelector(loginUserSelector);

    const todolist = useSelector(todoSelector);

    const dispatch = useDispatch();

    const remove = (id: number)=> {

        const server = `http://localhost:8000/api/delete/${id}`;

        const user_id = user?.id;

        // 第二引数は、オブジェクトの形で渡す！ => サーバー側は、req.bodyで取り出す！
        axios.post(server,{ user_id }) // { user_id:user_id }の省略
            .then( (res: any)=> {

                let axiosData:any = [];
                
                axiosData.push(...res.data);
            
                dispatch(removeTodo(axiosData));

            }).catch( (error)=>{
                console.log(error);
            });
    };


    return (
        <React.Fragment>
            {
                user === null ? 
                <h2 className={classes.title} >まずはログイン！</h2> :
                <React.Fragment>
                    {
                        todolist.length === 0 ? <h2>Todoの登録がありません！</h2>:
                        <React.Fragment>
                            <h2 className={classes.title} >Todo一覧画面</h2>
                            <div className={classes.text} >
                                <table className={classes.tableWidth} >
                                    <thead className={classes.todoTitle} >
                                        <tr>
                                            <th>登録 No</th>
                                            <th>チケット</th>
                                            <th>担当者</th>
                                            <th>期日</th>
                                            <th>開始日</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            todolist.map(
                                                (todo: todoType, index: number)=>{
                                                    return (
                                                        <tr key={todo.id} className={classes.tableBody} >
                                                            <td>{index + 1}</td>
                                                            <Link href={`/detail/${todo.id}`} ><td>{todo.todo}</td></Link>
                                                            <td>{todo.handler}</td>
                                                            <td>{todo.date}</td>
                                                            <td>{todo.start}</td>
                                                            <td><button onClick={ ()=>{remove(todo.id)} } className={classes.button} >削除</button></td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                        }
                                    </tbody>
                                </table>
                                <p>チケット名をクリックすると、登録チケットの詳細確認および編集ができます！！</p>
                            </div>
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default TodoList;