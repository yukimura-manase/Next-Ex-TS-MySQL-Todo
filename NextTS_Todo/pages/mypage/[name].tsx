import { useRouter } from "next/router";

const User = ()=> {

    const router = useRouter();
    console.log(router.query);

    return (
        <h1>{router.query.name}さんのMyページ</h1>

        
    );
};

export default User;