import { useState } from 'react'
import './App.css'

function App() {
    // State for dark/light theme
    const [isDark, setIsDark] = useState(true)

    // State to store messages - this is React's way of managing data
    const [messages, setMessages] = useState([
        {
            id: 1,
            author: 'Welcome Bot',
            text: 'Welcome to the MERN Message Board! 🎉 Try the theme toggle above!',
            timestamp: new Date().toLocaleString(),
            reactions: { '👍': 5, '❤️': 3, '😂': 1 }
        },
        {
            id: 2,
            author: 'Learning Guide',
            text: 'This is your first React app. Try adding a message below! You can also react to messages.',
            timestamp: new Date().toLocaleString(),
            reactions: { '👍': 2, '❤️': 1, '😂': 0 }
        },
    ])

    // State for the form inputs
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault() // Prevent page refresh

        if (!author.trim() || !text.trim()) return // Don't submit empty messages

        // Create new message object
        const newMessage = {
            id: Date.now(), // Simple unique ID
            author: author,
            text: text,
            timestamp: new Date().toLocaleString(),
            reactions: { '👍': 0, '❤️': 0, '😂': 0 }
        }

        // Add new message to the list (this is how React updates the UI)
        setMessages([newMessage, ...messages])

        // Clear the form
        setAuthor('')
        setText('')
    }

    // Function to handle emoji reactions
    const handleReaction = (messageId, emoji) => {
        setMessages(messages.map(msg => {
            if (msg.id === messageId) {
                return {
                    ...msg,
                    reactions: {
                        ...msg.reactions,
                        [emoji]: msg.reactions[emoji] + 1
                    }
                }
            }
            return msg
        }))
    }

    // Function to delete a message
    const handleDelete = (messageId) => {
        setMessages(messages.filter(msg => msg.id !== messageId))
    }

    return (
        <div className={`app ${isDark ? 'dark' : 'light'}`}>
            {/* Header Section */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">💬</span>
                        <h1>Message Board</h1>
                    </div>
                    <p className="tagline">Learning MERN Stack - React Frontend</p>

                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle theme"
                    >
                        <span className="toggle-icon">{isDark ? '☀️' : '🌙'}</span>
                        <span className="toggle-text">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="main">
                {/* Message Form Card */}
                <section className="form-section">
                    <div className="card form-card">
                        <h2>✍️ Post a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="author">Your Name</label>
                                <input
                                    type="text"
                                    id="author"
                                    placeholder="Enter your name..."
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    placeholder="What's on your mind?"
                                    rows="3"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                <span>Send Message</span>
                                <span className="btn-icon">→</span>
                            </button>
                        </form>
                    </div>
                </section>

                {/* Messages List */}
                <section className="messages-section">
                    <h2>📝 Messages ({messages.length})</h2>
                    <div className="messages-list">
                        {messages.map((message) => (
                            <article key={message.id} className="message-card">
                                <div className="message-header">
                                    <div className="avatar">{message.author.charAt(0).toUpperCase()}</div>
                                    <div className="message-meta">
                                        <h3 className="author-name">{message.author}</h3>
                                        <time className="timestamp">{message.timestamp}</time>
                                    </div>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(message.id)}
                                        aria-label="Delete message"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <p className="message-text">{message.text}</p>

                                {/* Reaction Buttons */}
                                <div className="reactions">
                                    {Object.entries(message.reactions).map(([emoji, count]) => (
                                        <button
                                            key={emoji}
                                            className={`reaction-btn ${count > 0 ? 'active' : ''}`}
                                            onClick={() => handleReaction(message.id, emoji)}
                                        >
                                            <span className="reaction-emoji">{emoji}</span>
                                            <span className="reaction-count">{count}</span>
                                        </button>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>Built with ❤️ while learning the MERN Stack</p>
                <div className="tech-stack">
                    <span className="tech-badge">React</span>
                    <span className="tech-badge">Vite</span>
                    <span className="tech-badge">Netlify</span>
                </div>
            </footer>
        </div>
    )
}

export default App
