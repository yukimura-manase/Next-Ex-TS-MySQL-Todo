import { createStyles,makeStyles } from '@material-ui/styles'; //materialUI

const useStyle = makeStyles(()=> {  // 1. 変数「useStyle」を生成、makeStylesメソッドを呼び出して代入する！
    return createStyles({           // 2. createStylesメソッドで、styleの設定をする！ => styleオブジェクトを作成してreturnする！

      "header": {
        background:"#3399FF",
      },
      "title": {
        width:"100%",
        textAlign:"center",
        color:"white",
        fontSize:"40px"
      },

    });
});


const Header = ()=> {

    const classes = useStyle();

    return (
        <header className={classes.header} >
            <h1 className={classes.title} >Next-TypeScript-Express-MySQLで作るタスク管理ツール</h1>
        </header>
    );
};

export default Header;