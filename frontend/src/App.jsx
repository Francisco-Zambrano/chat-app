import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: message,
      from: 'Me'
    }

    setMessages([...messages, newMessage]);
    socket.emit('message', message);
  };

  useEffect(() => {
    socket.on('message', receivedMessage);

    return () => {
      socket.off('message', receivedMessage);
    };
  }, []);

  const receivedMessage = (message) => {
    setMessages((state) => [...state, message]);
  }


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Write your message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>

      <ul>
        {
          messages.map((message, id) => (
            <li key={id}>{message.from}: {message.body}</li>
          ))
        }
      </ul>

    </div>
  )
}

export default App
