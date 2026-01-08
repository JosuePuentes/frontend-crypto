import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Floating Register Button */}
      <button className="floating-register-btn" onClick={toggleRegister}>
        <span className="btn-icon">₿</span>
        <span className="btn-text">Sign Up</span>
      </button>

      {/* Register Sidebar */}
      <div className={`register-sidebar ${showRegister ? 'active' : ''}`}>
        <button className="close-sidebar" onClick={toggleRegister}>
          ✕
        </button>
        <Register onClose={toggleRegister} />
      </div>

      {/* Overlay */}
      {showRegister && (
        <div className="overlay" onClick={toggleRegister}></div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">ASTROCOIN</h1>
          <p className="hero-subtitle">The currency that will change the <span className="highlight-yellow">future</span></p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={toggleRegister}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={handleLoginClick}>
              Login
            </button>
          </div>
          
          {/* Commercial Phrases */}
          <div className="hero-commercials">
            <div className="commercial-phrase">
              <span className="commercial-icon">💎</span>
              <p className="commercial-text">
                <strong>Join 420M+ investors</strong> worldwide in the cryptocurrency revolution
              </p>
            </div>
            
            <div className="commercial-phrase">
              <span className="commercial-icon">🚀</span>
              <p className="commercial-text">
                <strong>Trade 24/7</strong> with instant transactions and zero borders
              </p>
            </div>
            
            <div className="commercial-phrase">
              <span className="commercial-icon">🔒</span>
              <p className="commercial-text">
                <strong>Bank-level security</strong> protecting your digital assets around the clock
              </p>
            </div>
            
            <div className="commercial-phrase">
              <span className="commercial-icon">⚡</span>
              <p className="commercial-text">
                <strong>Lightning-fast</strong> blockchain technology for seamless trading
              </p>
            </div>
            
            <div className="commercial-phrase highlight">
              <span className="commercial-icon">🌟</span>
              <p className="commercial-text">
                <strong>Don't miss out!</strong> The future of money is here. Start investing in ASTROCOIN today and be part of the financial revolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose ASTROCOIN?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Safe</h3>
            <p>Bank-level security with advanced encryption technology protecting your assets 24/7</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Execute transactions in seconds with our revolutionary blockchain technology</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Network</h3>
            <p>Trade anywhere, anytime with our worldwide cryptocurrency exchange platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Low Fees</h3>
            <p>Enjoy competitive transaction fees and maximize your crypto investments</p>
          </div>
        </div>
      </section>

      {/* Crypto Commercials Section */}
      <section className="commercials-section">
        <h2 className="section-title">The Cryptocurrency Revolution</h2>
        
        <div className="commercial-card">
          <div className="commercial-content">
            <h3>🌟 Digital Gold for the Modern Age</h3>
            <p>
              ASTROCOIN represents the next evolution in digital assets. Built on cutting-edge 
              blockchain technology, our cryptocurrency offers unparalleled security, speed, and 
              accessibility. Join millions of investors who are already part of the future of finance.
            </p>
          </div>
        </div>

        <div className="commercial-card highlight">
          <div className="commercial-content">
            <h3>💰 Invest in Tomorrow, Today</h3>
            <p>
              The crypto market is exploding with opportunities. ASTROCOIN provides a gateway to 
              participate in this financial revolution. With institutional backing and a robust 
              ecosystem, we're not just another cryptocurrency—we're building the future of money.
            </p>
            <ul className="benefits-list">
              <li>✓ Decentralized and transparent</li>
              <li>✓ Instant global transactions</li>
              <li>✓ Protected against inflation</li>
              <li>✓ 24/7 market accessibility</li>
            </ul>
          </div>
        </div>

        <div className="commercial-card">
          <div className="commercial-content">
            <h3>🚀 Be Part of the Financial Future</h3>
            <p>
              Traditional banking is evolving. Cryptocurrencies like ASTROCOIN are democratizing 
              access to financial services worldwide. No intermediaries, no borders, no limits. 
              Experience true financial freedom with digital currency that puts you in control.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">$2.5T+</div>
            <div className="stat-label">Global Crypto Market Cap</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">420M+</div>
            <div className="stat-label">Crypto Users Worldwide</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Cryptocurrencies</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Crypto Journey?</h2>
        <p>Join ASTROCOIN today and be part of the financial revolution</p>
        <button className="btn-cta" onClick={toggleRegister}>
          Create Your Account Now
        </button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 ASTROCOIN. All rights reserved.</p>
        <div className="footer-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;

