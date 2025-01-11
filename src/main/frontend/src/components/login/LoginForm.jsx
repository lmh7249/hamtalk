import {useState} from "react";
import Input from "../common/Input";
import Button from "../common/Button";


const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("아이디: ", userId);
        console.log("비밀번호: ", password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" placeholder="아이디를 입력해주세요." value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <Input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <Button type="submit" text="로그인"/>
        </form>
    )
}

export default LoginForm