import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
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
        console.log(data);
        history.push(`/detail/${data.link._id}`);
      } catch (error) {
        
      }
    }
  }

  return (
    <div className="container">
      <div className="input-field col s6">
          <input
            placeholder="Placeholder"
            id="link"
            type="text"
            className="validate"
            value={link}
            onChange={linkHandler}
            onKeyPress={pressHandler} />
          <label htmlFor="link">First Name</label>
        </div>
    </div>
  );
}

export default CreatePage;
