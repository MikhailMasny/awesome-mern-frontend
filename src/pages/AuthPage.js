import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

function AuthPage() {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log('Target', event.target);
        console.log('Name', event.target.name);
        console.log('Form', form);
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            message(data.message);
            console.log('Data', data);
        } catch (error) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            message(data.message);
            console.log('Data', data);
            auth.login(data.token, data.userId);
        } catch (error) {
            
        }
    }

    return (
        <div className="container">
            <div className="col s6 offset-s3">
                <h1>Simple link app</h1>
                <div className="card orange darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div>
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" name="email" value={form.email} onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                            </div>
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" name="password" value={form.password} onChange={changeHandler} />
                                <label htmlFor="password">Password</label>
                                <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn blue darken-4" onClick={loginHandler} disabled={loading}>Login</button>
                        <button className="btn green darken-4" onClick={registerHandler} disabled={loading}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
