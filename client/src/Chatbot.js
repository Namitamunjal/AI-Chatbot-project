import React, { useState, useEffect, useRef } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant powered by Gemini. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  // Check API connection on component mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
      console.error('Connection check failed:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: data.timestamp || new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running on port 5000.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant powered by Gemini. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
    },
    chatContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0
    },
    status: {
      fontSize: '0.9rem',
      opacity: 0.9
    },
    messagesContainer: {
      flex: 1,
      padding: '1.5rem',
      overflowY: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    message: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'flex-start'
    },
    userMessage: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row-reverse'
    },
    messageContent: {
      maxWidth: '70%',
      padding: '0.75rem 1rem',
      borderRadius: '18px',
      wordWrap: 'break-word'
    },
    userMessageContent: {
      maxWidth: '70%',
      padding: '0.75rem 1rem',
      borderRadius: '18px',
      borderBottomRightRadius: '4px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      wordWrap: 'break-word'
    },
    botMessageContent: {
      maxWidth: '70%',
      padding: '0.75rem 1rem',
      borderRadius: '18px',
      borderBottomLeftRadius: '4px',
      backgroundColor: 'white',
      color: '#333',
      border: '1px solid #e1e5e9',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      wordWrap: 'break-word'
    },
    errorMessageContent: {
      maxWidth: '70%',
      padding: '0.75rem 1rem',
      borderRadius: '18px',
      borderBottomLeftRadius: '4px',
      backgroundColor: '#fee',
      color: '#c33',
      border: '1px solid #fcc',
      wordWrap: 'break-word'
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      margin: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '14px'
    },
    userAvatar: {
      backgroundColor: '#667eea'
    },
    botAvatar: {
      backgroundColor: '#764ba2'
    },
    timestamp: {
      fontSize: '0.75rem',
      marginTop: '0.25rem',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    inputContainer: {
      padding: '1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    },
    inputForm: {
      display: 'flex',
      gap: '0.75rem'
    },
    input: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '25px',
      padding: '0.75rem 1rem',
      color: 'white',
      fontSize: '1rem',
      outline: 'none'
    },
    button: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'transform 0.2s ease'
    },
    clearButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      padding: '0.5rem',
      borderRadius: '50%',
      cursor: 'pointer',
      color: 'white'
    },
    loadingDots: {
      display: 'flex',
      gap: '4px',
      padding: '0.75rem 1rem'
    },
    loadingDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#667eea',
      animation: 'bounce 1.4s infinite'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>🤖 AI Chatbot</h1>
            <div style={styles.status}>
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>
          </div>
          <button
            onClick={clearChat}
            style={styles.clearButton}
            title="Clear chat"
          >
            🗑️
          </button>
        </div>

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={message.sender === 'user' ? styles.userMessage : styles.message}
            >
              <div style={{
                ...styles.avatar,
                ...(message.sender === 'user' ? styles.userAvatar : styles.botAvatar)
              }}>
                {message.sender === 'user' ? '👤' : '🤖'}
              </div>
              
              <div>
                <div style={
                  message.sender === 'user' 
                    ? styles.userMessageContent 
                    : message.isError 
                      ? styles.errorMessageContent 
                      : styles.botMessageContent
                }>
                  {message.text}
                </div>
                <div style={styles.timestamp}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div style={styles.message}>
              <div style={{...styles.avatar, ...styles.botAvatar}}>
                🤖
              </div>
              <div style={styles.botMessageContent}>
                <div style={styles.loadingDots}>
                  <div style={{...styles.loadingDot, animationDelay: '0s'}}></div>
                  <div style={{...styles.loadingDot, animationDelay: '0.2s'}}></div>
                  <div style={{...styles.loadingDot, animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={styles.inputContainer}>
          <div style={styles.inputForm}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
              placeholder="Type your message here..."
              style={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              style={{
                ...styles.button,
                opacity: (isLoading || !inputMessage.trim()) ? 0.5 : 1,
                cursor: (isLoading || !inputMessage.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
          
          {!isConnected && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                ⚠️ Backend server not connected. Please start the Flask server on port 5000.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Chatbot;