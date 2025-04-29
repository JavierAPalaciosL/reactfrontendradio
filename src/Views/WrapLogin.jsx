import {Outlet, useNavigate} from "react-router-dom";
import Login from "./Login.jsx";
import {useEffect} from "react";

export default function WrapLogin({isCorrectUser, setIsCorrectUser, setDataUser}) {

    const navigate = useNavigate()

    useEffect(() => {
        if(isCorrectUser){
            navigate('/welcome', { replace: true });
        }
    }, [isCorrectUser]);

    return (
        <>
            {isCorrectUser && <Outlet></Outlet>}
            {!isCorrectUser && <Login setDataUser={setDataUser} setIsCorrectUser={setIsCorrectUser}></Login>}
        </>

    );

}