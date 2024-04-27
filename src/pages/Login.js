import React, { useState } from 'react';
import '../css/LoginPage.css';
import {login} from '../api/master';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loginObj, setLoginObj] = useState({
        username: '',
        password: ''
    })
    const onLogin = async () => {
        debugger
       await login(loginObj).then((res) => {
            if(res.token) {
                console.log('res',res)
                localStorage.setItem('token',res.token);
                navigate('/employee');
            }
        })
    }
    const onChangeText =(event,key) => {
        setLoginObj(val => ({ ...val, [key]: event.target.value }));
    }
    return (
        <div className='mainDiv'>
            <div className="container">
                <div className="card">
                    <h2>Login</h2>
                    <form>
                        <input type="text" id="username" name="username" placeholder="Username" required  onChange={(event)=> onChangeText(event,'username')}/>
                        <input type="password" id="password" name="password" placeholder="Password" required onChange={(event)=> onChangeText(event,'password')}/>
                        <input type='button' value={'Login'} onClick={onLogin} className='loginButton'/>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Login;