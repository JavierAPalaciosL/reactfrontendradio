import {Button, Divider, Input, message} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect, useRef} from "react";
import UserAPI from "../api/UserAPI.js";
import {useState} from "react";

const userAPI = new UserAPI();


export default function Login({setIsCorrectUser, setDataUser}) {
    const key = "fetchUser";
    const [messageApi, contextHolder] = message.useMessage();
    const inputEmail = useRef("");
    const inputPassword = useRef("");
    const [fetchingUserg, setFetchingUser] = useState({email: undefined, password: undefined});

    useEffect(() => {

        if(localStorage.getItem("token") !== null || localStorage.getItem("token") !== undefined){
            userAPI.getSession().then(e=>{
                setIsCorrectUser(true);
                setDataUser(e);
                console.log(e)
            }).catch(e =>{
                console.log(e);
            });

        }
    }, [fetchingUserg]);

    const onFinish = (e) => {
        const {userEmail: email, userPass: password} = e;
        console.log("change status "+email+" "+password);
        localStorage.setItem("token", password);
        console.log(password);
        if(localStorage.getItem("token") !== null || localStorage.getItem("token") !== undefined){
            setIsCorrectUser(true);
        }
    }

    const success = () => {
        messageApi.open({
            type: 'loading',
            content: 'This is a success message',
            duration: 0,
            key: key
        });

        userAPI.getUser(inputEmail.current.input.value, inputPassword.current.input.value).then(e=>{

                setFetchingUser(e);
                setDataUser(e);

                onFinish(e);

                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                    duration: 2,
                    key: key
                });
            }
        ).catch(e =>{
            console.log(e)
            messageApi.open({
                type: 'error',
                content: 'Wrong email or password',
                duration: 2,
                key: key
            });
        });

    };

    return (
        <div style={{border: "2px solid cyan", display: "grid", marginLeft: "36%", marginTop: "10%", backgroundColor: "white", padding: "50px", borderRadius: "20px", width: '40vh', height: 'auto'}}>
            <h1 align="center">Radio database</h1>
            <Divider style={{marginTop: '0px', borderColor: '#d9d9d9' }}></Divider>

            <Input size="large" placeholder="email"  prefix={<UserOutlined />} ref={inputEmail}/>
            <br></br>
            <Input.Password
                size="large"
                placeholder="input password"
                prefix={<KeyOutlined />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                ref={inputPassword}
            />
            <br></br>
            {contextHolder}
            <Button onClick={success} type="primary" style={{backgroundColor:"green", borderRadius: "20px", border: "1px solid black"}}>Start</Button>
        </div>
    );
}