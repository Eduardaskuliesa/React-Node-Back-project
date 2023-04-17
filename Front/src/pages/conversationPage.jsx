import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SingleConversatonCard from '../components/singleConversatonCard';

function ConversationPage() {
  const { username, secret } = useSelector((state) => state.auth);

  const [convos, setConvos] = useState([]);

  useEffect(() => {
    const data = {
      username,
      secret,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:5002/getConversations', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConvos(data.conversations);
      });
  }, []);

  return (
    <div className="d-flex j-center">

      <div className="container">
        {convos.map((x, i) => <SingleConversatonCard item={x} key={i} />)}
      </div>

    </div>
  );
}

export default ConversationPage;
