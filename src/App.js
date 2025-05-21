import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [maxReels, setMaxReels] = useState(1);
  const [reels, setReels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReels([]);
    

    try {
      // Fetch JSON data from /scrape endpoint
      const jsonResponse = await axios.get(`http://localhost:8000/scrape`, {
        params: { username, max_reels: maxReels },
      });
      setReels(jsonResponse.data);

    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // Common styles
  const colors = {
    primary: '#ff3366',
    secondary: '#9933ff',
    dark: '#222222',
    light: '#ffffff',
    lightPink: '#fff0f5',
    error: '#ff4444',
    link: '#3366ff',
    cardBg: '#ffffff'
  };

  const shadows = {
    small: '0 2px 5px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div style={{
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      color: colors.dark
    }}>
      <h1 style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: colors.light,
        padding: '20px',
        borderRadius: '12px',
        fontSize: '32px',
        textAlign: 'center',
        marginBottom: '30px',
        boxShadow: shadows.medium,
        fontWeight: '700',
        letterSpacing: '0.5px'
      }}>Instagram Reels Scraper</h1>

      <div style={{
        backgroundColor: colors.light,
        padding: '30px',
        borderRadius: '16px',
        boxShadow: shadows.medium,
        maxWidth: '600px',
        margin: '0 auto 40px auto',
        border: `1px solid rgba(0,0,0,0.05)`
      }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%'
        }}>
          <div>
            <label htmlFor="username" style={{
              color: colors.dark,
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px',
              display: 'block'
            }}>
              Instagram Username
            </label>
            <div style={{
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '16px'
              }}>@</span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 35px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(255,255,255,0.8)'
                }}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="maxReels" style={{
              color: colors.dark,
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px',
              display: 'block'
            }}>
              Max Reels (1-10)
            </label>
            <input
              type="number"
              id="maxReels"
              value={maxReels}
              onChange={(e) => setMaxReels(Math.min(10, Math.max(1, e.target.value)))}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.1)',
                fontSize: '16px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(255,255,255,0.8)'
              }}
              min="1"
              max="10"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              background: loading 
                ? '#999' 
                : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              color: colors.light,
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: shadows.small,
              marginTop: '10px'
            }}
            disabled={loading}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid #fff',
                  borderRadius: '50%',
                  marginRight: '10px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Scraping...</span>
              </div>
            ) : 'Scrape Reels'}
          </button>
        </form>
      </div>

      {error && (
        <div style={{
          backgroundColor: 'rgba(255, 68, 68, 0.1)',
          border: `1px solid ${colors.error}`,
          color: colors.error,
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '30px',
          fontWeight: '500',
          maxWidth: '600px',
          margin: '0 auto 30px auto'
        }}>
          <p>{error}</p>
        </div>
      )}

      {reels.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          borderRadius: '16px',
          backgroundColor: colors.light,
          boxShadow: shadows.medium,
          border: `1px solid rgba(0,0,0,0.05)`
        }}>
          <h2 style={{
            color: colors.dark,
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '20px',
            borderBottom: `2px solid ${colors.primary}`,
            paddingBottom: '10px'
          }}>Reels Data</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {reels.map((reel) => (
              <div key={reel.id} style={{
                backgroundColor: colors.cardBg,
                borderRadius: '12px',
                padding: '20px',
                boxShadow: shadows.small,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <h3 style={{
                  color: colors.dark,
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  borderLeft: `4px solid ${colors.primary}`,
                  paddingLeft: '10px'
                }}>{reel.title || 'Scraped data'}</h3>
                
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600', color: colors.dark }}>Reel ID:</span> 
                  <span style={{ marginLeft: '5px', color: '#666' }}>{reel.id}</span>
                </div>
                
                <div style={{ marginBottom: '10px', wordBreak: 'break-all' }}>
                  <span style={{ fontWeight: '600', color: colors.dark }}>URL:</span>{' '}
                  <a 
                    href={reel.reel_url} 
                    style={{
                      color: colors.link,
                      textDecoration: 'none',
                      borderBottom: `1px solid ${colors.link}`,
                      transition: 'opacity 0.2s ease'
                    }} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {reel.reel_url}
                  </a>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600', color: colors.dark }}>Posted:</span> 
                  <span style={{ marginLeft: '5px', color: '#666' }}>{reel.posted_at}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(153, 51, 255, 0.1)',
                    padding: '5px 10px',
                    borderRadius: '20px'
                  }}>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>
                      👁️ {reel.views || 'N/A'}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 51, 102, 0.1)',
                    padding: '5px 10px',
                    borderRadius: '20px'
                  }}>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>
                      ❤️ {reel.likes || 'N/A'}
                    </span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600', color: colors.dark }}>Audio:</span> 
                  <span style={{ marginLeft: '5px', color: '#666' }}>{reel.voice || 'N/A'}</span>
                </div>
                
                {reel.video_url && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ fontWeight: '600', color: colors.dark }}>Video:</span>{' '}
                    <a 
                      href={reel.video_url} 
                      style={{
                        color: colors.link,
                        textDecoration: 'none',
                        borderBottom: `1px solid ${colors.link}`,
                        transition: 'opacity 0.2s ease'
                      }} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Download Video
                    </a>
                  </div>
                )}
                
                {reel.thumbnail_url && (
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontWeight: '600', color: colors.dark, marginBottom: '10px' }}>Thumbnail:</div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: shadows.small
                    }}>
                      <img 
                        src={reel.thumbnail_url || "/placeholder.svg"} 
                        alt="Thumbnail" 
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          display: 'block'
                        }} 
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input:focus {
          border-color: ${colors.primary} !important;
          box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.2) !important;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: ${shadows.medium};
        }
        
        a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default App;