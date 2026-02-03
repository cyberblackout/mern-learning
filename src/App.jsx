import { useState } from 'react'
import './App.css'

function App() {
    // State to store messages - this is React's way of managing data
    const [messages, setMessages] = useState([
        { id: 1, author: 'Welcome Bot', text: 'Welcome to the MERN Message Board! 🎉', timestamp: new Date().toLocaleString() },
        { id: 2, author: 'Learning Guide', text: 'This is your first React app. Try adding a message below!', timestamp: new Date().toLocaleString() },
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
            timestamp: new Date().toLocaleString()
        }

        // Add new message to the list (this is how React updates the UI)
        setMessages([newMessage, ...messages])

        // Clear the form
        setAuthor('')
        setText('')
    }

    return (
        <div className="app">
            {/* Header Section */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">💬</span>
                        <h1>Message Board</h1>
                    </div>
                    <p className="tagline">Learning MERN Stack - React Frontend</p>
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
                                </div>
                                <p className="message-text">{message.text}</p>
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
