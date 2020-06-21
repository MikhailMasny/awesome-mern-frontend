import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

function CreatePage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  const linkHandler = (event) => {
    setLink(event.target.value);
    console.log('Target', event.target);
    console.log('Name', event.target.name);
    console.log('Form', link);
  }

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (error) { }
    }
  }
  return (
    <div className="uk-container uk-margin-small-top uk-flex uk-flex-center">
      <div className="uk-margin">
        <input id="link" className="uk-input uk-form-width-large" type="text" placeholder="Your link here.." value={link} onChange={linkHandler} onKeyPress={pressHandler} />
      </div>
    </div>
  );
}

export default CreatePage;
