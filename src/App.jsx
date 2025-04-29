import './App.css'
import Login from "./Views/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import WrapLogin from "./Views/WrapLogin.jsx";
import Welcome from "./Views/Welcome.jsx";

function App() {
        const [isCorrectUser, setIsCorrectUser ] = useState(false)
        const [dataUser, setDataUser ] = useState({email: undefined})

    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WrapLogin isCorrectUser={isCorrectUser} setIsCorrectUser={setIsCorrectUser} setDataUser={setDataUser}/>}>
                        <Route path="/welcome" element={<Welcome dataUser={dataUser}/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        );
}

export default App
