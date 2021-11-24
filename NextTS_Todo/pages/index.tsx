import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { feachTodo, setLoginUser } from '../redux/ActionCreator';
import { stateType, submitUserType } from '../components/PageTypes';
import TodoList from '../components/List';


const loginUserSelector = (state: stateType)=> {
  return state.StoreState.user;
};

const Home = ()=> {

  const user = useSelector(loginUserSelector);

  const dispatch = useDispatch();

  // axios通信で、APIサーバー経由でDBからデータを取得する！
  useEffect(()=>{

    if(user){
      console.log('動作確認');
      const id = user.id;
      //console.log(id);
      const server = `http://localhost:8000/api/todolist/${id}`; // ログインユーザーのリストを取得する

      axios.post(server)
        .then( (res:any)=> { // AxiosResponse
            console.log(res);
            let axiosData:any = [];
            //console.log(res.data);
            axiosData.push(...res.data);
            dispatch(feachTodo(axiosData));

            // ユーザーログイン時に、ローカルストレージにデータを保存
            localStorage.setItem('username',user.name); // ローカルストレージにkey名と値の保存
            localStorage.setItem('pass',user.password);
            //console.log(localStorage);
            
        })
        .catch(console.error);

    } else if(localStorage.getItem('username') && localStorage.getItem('pass')){

      console.log('ローカルストレージを使ったログイン処理実行！！');

      const storage = getLocalStorage();

      const server = `http://localhost:8000/api/userlogin`;

      if(storage.storageUser && storage.storagePass){ // nullの可能性否定

        console.log('ローカルストレージにデータあり！');

        const submitUser: submitUserType = {
          user: storage.storageUser,
          password: storage.storagePass
        };

        axios.get(server,{params:submitUser})
                .then( (response: any)=> {
                  console.log(response);
                    //console.log(response.data);
                    //console.log(response.config.params);
                    //console.log(response.data[0]);

                    let axiosUserData:any = response.data.shift(); // または、response.data[0]
                    //console.log(axiosUserData);

                    dispatch(
                        setLoginUser(axiosUserData)
                    );
                    //console.log('ログイン処理完了');
                    
                })
                .catch( (error)=>{
                    //console.log(error);
                });
      };

    };
    
  });

  const getLocalStorage = ()=> {

    const storageUser = window.localStorage.getItem('username'); // ローカルストレージにkey名でアクセスして、値を取得する！
    const storagePass = window.localStorage.getItem('pass');

    //console.log(`ローカルストレージから、ユーザー名:${storageUser}と、そのパス：${storagePass}を取得`);

    let storageData = { storageUser,storagePass };

    return storageData;
  };



  return (
   <React.Fragment>

    <TodoList />
     
   </React.Fragment>
  );
};

export default Home;
