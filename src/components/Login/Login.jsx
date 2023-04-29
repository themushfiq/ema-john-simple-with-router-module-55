import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);

    const {signIn} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            form.reset();
            navigate(from, {replace: true });
        })
        .catch(error =>{
            console.log(error);
        })

    }

    return (
        <div className='form-container'> 
            <h2 className='form-title'>Login</h2>

            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor=''>Email</label>
                    <input type='email' name='email' id='' placeholder='Your Email' required></input>
                </div>
                <div className="form-control">
                    <label htmlFor=''>Password</label>
                    <input type='password' name='password' id='' placeholder='Your Password' required></input>
            <p onClick={() => setShow(!show)}><small>
                {
                    show ? <span>Hide Password</span>: <span>Show Password</span>
                }
                </small></p>

                </div>
                <input className='btn-submit' type='submit' value='Login'></input>
            </form>
            <p><small>New to Ema-John? 
                <Link to="/signup">Sign Up</Link></small></p>
        </div>
    );
};

export default Login;