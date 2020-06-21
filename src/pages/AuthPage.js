import React, { useState, useEffect, useContext } from 'react';
import 'uikit';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../contexts/AuthContext';

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
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (error) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (error) {
    }
  }

  return (
    <div className="uk-position-center">
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Authorization</legend>
        <div className="uk-margin">
          <input id="email" type="email" name="email" className="uk-input" placeholder="Email" value={form.email} onChange={changeHandler} />
        </div>
        <div className="uk-margin">
          <input id="password" type="password" name="password" className="uk-input" placeholder="Password" value={form.password} onChange={changeHandler} />
        </div>
        <button className="uk-button uk-button-default" onClick={loginHandler} disabled={loading}>Sign in</button>
        <button className="uk-button uk-button-secondary" onClick={registerHandler} disabled={loading}>Sign up</button>
      </fieldset>
  </div>
  );
}

export default AuthPage;
