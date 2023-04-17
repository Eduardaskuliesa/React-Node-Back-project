/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';

function ChatPage() {
  const { id } = useParams();
  const messageRef = React.useRef();

  const { username, secret } = useSelector((state) => state.auth);

  const [convo, setConvo] = React.useState(null);

  const sendMessage = () => {
    const user = {
      id,
      username,
      secret,
      message: messageRef.current.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:5002/sendMessage', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConvo(data.conversation);
      });
  };

  React.useEffect(() => {
    fetch(`http://localhost:5002/chat/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConvo(data.conversation);
      });
  }, []);

  const like = (index) => {
    fetch(`http://localhost:5002/like/${id}/${index}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConvo(data.conversation);
      });
  };

  const convertTime = (stamp) => {
    const date = new Date(stamp);

    return `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`;
  };
  return (
    <Stack>
      <Box>
        {convo?.messages.map((x, i) => (
          <Box key={i} className="singleMessage">
            <h3>{x.username}</h3>
            <Box>{x.message.includes('http') ? <img className="chatImage" src={x.message} alt="" /> : x.message}</Box>
            <b>{convertTime(x.time)}</b>
            <Box className="d-flex j-center">
              <Box>
                Likes:
                {x.likes}
              </Box>
              <button type="submit" className="ml-3" onClick={() => like(i)}>Like</button>
            </Box>

          </Box>
        ))}
      </Box>
      <div className="chatBottom">
        <input type="text" ref={messageRef} placeholder="message" />
        <button type="submit" onClick={sendMessage}>Send</button>
      </div>
    </Stack>
  );
}

export default ChatPage;
