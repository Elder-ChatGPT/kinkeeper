import { useState } from 'react';
import './Style6.css'; // Import the CSS file

const Login = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data); // Ensure correct property
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat with AI About Health Advice</h2>
<p style={{color:"blue", fontSize:"1.1em"}}>NB:If You Need Personalized Health Advice, then Login.</p>
      <textarea
        className="chat-input"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      ></textarea>

      <button
        className="chat-button"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Send'}
      </button>

      {error && <p className="error-message">Error: {error}</p>}

      {response && (
        <div className="chat-response">
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
