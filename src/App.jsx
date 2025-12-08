import { useState, useEffect } from 'react';

const questions = [
  {
    category: "Science",
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Diamond", "Titanium", "Quartz"],
    correct: 1,
    accent: "#8b5cf6",
    bgGradient: "radial-gradient(ellipse at top, #c4b5fd 0%, #a78bfa 50%, #8b5cf6 100%)",
    icon: "💎"
  },
  {
    category: "Geography",
    question: "Which country has the most islands in the world?",
    options: ["Indonesia", "Philippines", "Sweden", "Finland"],
    correct: 2,
    accent: "#06b6d4",
    bgGradient: "radial-gradient(ellipse at top, #a5f3fc 0%, #22d3ee 50%, #06b6d4 100%)",
    icon: "🏝️"
  },
  {
    category: "History",
    question: "In what year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1898"],
    correct: 1,
    accent: "#3b82f6",
    bgGradient: "radial-gradient(ellipse at top, #bfdbfe 0%, #60a5fa 50%, #3b82f6 100%)",
    icon: "🚢"
  },
  {
    category: "Nature",
    question: "What animal has the longest lifespan?",
    options: ["Elephant", "Galápagos Tortoise", "Bowhead Whale", "Greenland Shark"],
    correct: 3,
    accent: "#10b981",
    bgGradient: "radial-gradient(ellipse at top, #a7f3d0 0%, #34d399 50%, #10b981 100%)",
    icon: "🦈"
  },
  {
    category: "Space",
    question: "How many planets in our solar system have rings?",
    options: ["1", "2", "3", "4"],
    correct: 3,
    accent: "#6366f1",
    bgGradient: "radial-gradient(ellipse at top, #c7d2fe 0%, #818cf8 50%, #6366f1 100%)",
    icon: "🪐"
  },
  {
    category: "Food",
    question: "Which fruit floats because it's 25% air?",
    options: ["Banana", "Apple", "Orange", "Grape"],
    correct: 1,
    accent: "#f43f5e",
    bgGradient: "radial-gradient(ellipse at top, #fecdd3 0%, #fb7185 50%, #f43f5e 100%)",
    icon: "🍎"
  },
  {
    category: "Music",
    question: "Which instrument has 88 keys?",
    options: ["Organ", "Accordion", "Piano", "Harpsichord"],
    correct: 2,
    accent: "#a855f7",
    bgGradient: "radial-gradient(ellipse at top, #e9d5ff 0%, #c084fc 50%, #a855f7 100%)",
    icon: "🎹"
  },
  {
    category: "Sports",
    question: "In which sport would you perform a 'McTwist'?",
    options: ["Skiing", "Skateboarding", "BMX", "Gymnastics"],
    correct: 1,
    accent: "#f59e0b",
    bgGradient: "radial-gradient(ellipse at top, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)",
    icon: "🛹"
  },
  {
    category: "Cinema",
    question: "What was the first Pixar movie?",
    options: ["A Bug's Life", "Finding Nemo", "Toy Story", "Monsters, Inc."],
    correct: 2,
    accent: "#ec4899",
    bgGradient: "radial-gradient(ellipse at top, #fbcfe8 0%, #f472b6 50%, #ec4899 100%)",
    icon: "🎬"
  },
  {
    category: "Tech",
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correct: 2,
    accent: "#14b8a6",
    bgGradient: "radial-gradient(ellipse at top, #99f6e4 0%, #2dd4bf 50%, #14b8a6 100%)",
    icon: "📱"
  }
];

// Pre-generate shapes once outside component to prevent re-renders
const floatingShapes = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 20 + Math.random() * 40,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 8 + Math.random() * 8,
  delay: Math.random() * 4,
  type: ['circle', 'square'][Math.floor(Math.random() * 2)]
}));

const FloatingShapes = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {floatingShapes.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: 0.15,
            background: '#fff',
            borderRadius: s.type === 'circle' ? '50%' : '8px',
            animation: `floatShape ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Pre-generate confetti particles once
const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: 50 + (Math.random() - 0.5) * 10,
  color: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'][Math.floor(Math.random() * 6)],
  delay: Math.random() * 0.2,
  duration: 0.8 + Math.random() * 0.8,
  spread: (Math.random() - 0.5) * 250,
  isCircle: Math.random() > 0.5
}));

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
      {confettiParticles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: '45%',
          width: 8,
          height: 8,
          background: p.color,
          borderRadius: p.isCircle ? '50%' : '2px',
          animation: `confettiBurst ${p.duration}s ease-out ${p.delay}s forwards`,
          '--spread': `${p.spread}px`
        }} />
      ))}
    </div>
  );
};

const HomeButton = ({ onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      top: 20,
      left: 20,
      width: 50,
      height: 50,
      borderRadius: 16,
      background: 'rgba(255,255,255,0.95)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      zIndex: 100,
      fontSize: 24
    }}
    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
  >
    🏠
  </button>
);

const ProgressDots = ({ total, current }) => (
  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{
        width: i === current ? 28 : 8,
        height: 8,
        borderRadius: 4,
        background: i <= current ? '#fff' : 'rgba(255,255,255,0.3)',
        transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        boxShadow: i === current ? '0 2px 10px rgba(255,255,255,0.4)' : 'none'
      }} />
    ))}
  </div>
);

export default function TriviaQuiz() {
  const [gameState, setGameState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameState === 'playing' && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, gameState, showResult]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  const goHome = () => {
    setGameState('start');
    setShowConfetti(false);
  };

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 100 + timeLeft * 10);
      setCorrectAnswers(correctAnswers + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
    } else {
      setGameState('result');
    }
  };

  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const currentQ = questions[currentQuestion];

  return (
    <div style={{
      minHeight: '100vh',
      height: '100%',
      width: '100%',
      background: gameState === 'playing' ? currentQ.bgGradient : 
                  gameState === 'result' ? 'radial-gradient(ellipse at top, #fdf4ff 0%, #fae8ff 50%, #e879f9 100%)' :
                  'radial-gradient(ellipse at top, #dbeafe 0%, #93c5fd 50%, #3b82f6 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
      overflow: 'auto',
      transition: 'background 0.6s ease'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; width: 100%; overflow-x: hidden; }
        @keyframes floatShape {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes confettiBurst {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--spread), -300px) rotate(720deg) scale(0); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .option-btn {
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .option-btn:hover:not(:disabled) {
          transform: translateX(8px) scale(1.02);
        }
      `}</style>

      <FloatingShapes />
      <Confetti active={showConfetti} />
      {gameState !== 'start' && <HomeButton onClick={goHome} color={gameState === 'playing' ? currentQ.accent : '#a855f7'} />}

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px 20px',
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 110,
              height: 110,
              borderRadius: 32,
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
              boxShadow: '0 20px 50px rgba(139, 92, 246, 0.5)',
              animation: 'bounceIn 0.6s ease-out, float 3s ease-in-out infinite 0.6s'
            }}>
              <span style={{ fontSize: 52 }}>🧠</span>
            </div>
            
            <h1 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(2.5rem, 9vw, 3.5rem)',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 12px 0',
              textAlign: 'center',
              textShadow: '0 4px 20px rgba(0,0,0,0.2)',
              animation: 'fadeSlideUp 0.6s ease-out 0.2s both'
            }}>
              Brain Burst
            </h1>
            
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1.15rem',
              textAlign: 'center',
              margin: '0 0 40px 0',
              animation: 'fadeSlideUp 0.6s ease-out 0.3s both'
            }}>
              10 questions • Beat the clock • Win points!
            </p>

            <div style={{
              display: 'flex',
              gap: 10,
              marginBottom: 40,
              animation: 'fadeSlideUp 0.6s ease-out 0.4s both'
            }}>
              {['💎', '🌍', '🚀', '🦈', '🎬'].map((emoji, i) => (
                <div key={i} style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  animation: `popIn 0.4s ease-out ${0.5 + i * 0.08}s both`
                }}>
                  {emoji}
                </div>
              ))}
            </div>

            <button
              onClick={startGame}
              style={{
                background: '#fff',
                border: 'none',
                padding: '20px 56px',
                borderRadius: 20,
                color: '#3b82f6',
                fontSize: '1.2rem',
                fontWeight: 700,
                fontFamily: '"Outfit", sans-serif',
                cursor: 'pointer',
                boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                animation: 'fadeSlideUp 0.6s ease-out 0.6s both'
              }}
              onMouseOver={e => e.target.style.transform = 'scale(1.08) translateY(-3px)'}
              onMouseOut={e => e.target.style.transform = 'scale(1) translateY(0)'}
            >
              Start Quiz! 🚀
            </button>
          </div>
        )}

        {/* GAME SCREEN */}
        {gameState === 'playing' && (
          <div style={{ paddingTop: 30 }}>
            <div style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.95)',
              padding: '10px 20px',
              borderRadius: 14,
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              zIndex: 100
            }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: currentQ.accent, fontFamily: '"Outfit", sans-serif' }}>
                ⭐ {score}
              </span>
            </div>

            <ProgressDots total={questions.length} current={currentQuestion} />

            {/* TIMER */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: timeLeft <= 5 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(255,255,255,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: timeLeft <= 5 ? '0 8px 30px rgba(239,68,68,0.5)' : '0 8px 25px rgba(0,0,0,0.12)',
                animation: timeLeft <= 5 ? 'pulse 0.5s ease-in-out infinite' : 'bounceIn 0.4s ease-out'
              }}>
                <span style={{
                  color: timeLeft <= 5 ? '#fff' : currentQ.accent,
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  fontFamily: '"Outfit", sans-serif'
                }}>
                  {timeLeft}
                </span>
              </div>
            </div>

            {/* CATEGORY CARD */}
            <div style={{
              borderRadius: 24,
              overflow: 'hidden',
              marginBottom: 24,
              boxShadow: `0 20px 50px rgba(0,0,0,0.2)`,
              position: 'relative',
              background: 'rgba(255,255,255,0.95)',
              border: '4px solid rgba(255,255,255,0.5)',
              animation: 'bounceIn 0.5s ease-out',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 160
            }}>
              {/* Question Number Badge */}
              <div style={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: currentQ.accent,
                color: '#fff',
                width: 40,
                height: 40,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                fontFamily: '"Outfit", sans-serif',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                {currentQuestion + 1}
              </div>
              
              {/* Icon */}
              <div style={{
                fontSize: 56,
                marginBottom: 12,
                animation: 'wiggle 1s ease-in-out infinite'
              }}>
                {currentQ.icon}
              </div>
              
              {/* Category Title */}
              <h3 style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: currentQ.accent,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {currentQ.category}
              </h3>
            </div>

            {/* QUESTION */}
            <h2 style={{
              color: '#fff',
              fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)',
              fontWeight: 700,
              fontFamily: '"Outfit", sans-serif',
              textAlign: 'center',
              lineHeight: 1.4,
              margin: '0 0 24px 0',
              textShadow: '0 2px 15px rgba(0,0,0,0.2)',
              animation: 'fadeSlideUp 0.5s ease-out'
            }}>
              {currentQ.question}
            </h2>

            {/* OPTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentQ.options.map((option, index) => {
                const isCorrect = index === currentQ.correct;
                const isSelected = selectedAnswer === index;
                
                let bg = 'rgba(255,255,255,0.95)';
                let textColor = '#1e293b';
                let shadow = '0 6px 20px rgba(0,0,0,0.1)';
                
                if (showResult) {
                  if (isCorrect) {
                    bg = 'linear-gradient(135deg, #10b981, #34d399)';
                    textColor = '#fff';
                    shadow = '0 10px 30px rgba(16,185,129,0.4)';
                  } else if (isSelected) {
                    bg = 'linear-gradient(135deg, #ef4444, #f87171)';
                    textColor = '#fff';
                    shadow = '0 10px 30px rgba(239,68,68,0.4)';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className="option-btn"
                    style={{
                      background: bg,
                      border: 'none',
                      borderRadius: 16,
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: showResult ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      boxShadow: shadow,
                      animation: `slideInLeft 0.4s ease-out ${index * 0.08}s both`
                    }}
                  >
                    <span style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: showResult && (isCorrect || isSelected) ? 'rgba(255,255,255,0.25)' : `${currentQ.accent}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      color: showResult && (isCorrect || isSelected) ? '#fff' : currentQ.accent,
                      fontSize: '0.95rem',
                      fontFamily: '"Outfit", sans-serif'
                    }}>
                      {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : ['A','B','C','D'][index]}
                    </span>
                    <span style={{ color: textColor, fontSize: '1.05rem', fontWeight: 600 }}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <button
                onClick={nextQuestion}
                style={{
                  width: '100%',
                  marginTop: 20,
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  padding: '18px',
                  borderRadius: 16,
                  color: currentQ.accent,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: '"Outfit", sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  animation: 'bounceIn 0.4s ease-out',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.target.style.transform = 'translateY(0)'}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results! 🎉'}
              </button>
            )}
          </div>
        )}

        {/* RESULTS SCREEN */}
        {gameState === 'result' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
            <div style={{ fontSize: 80, marginBottom: 16, animation: 'bounceIn 0.6s ease-out' }}>
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🌟' : percentage >= 40 ? '👏' : '💪'}
            </div>

            <div style={{
              position: 'relative',
              width: 180,
              height: 180,
              marginBottom: 24,
              animation: 'bounceIn 0.6s ease-out 0.2s both'
            }}>
              <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="14"/>
                <circle cx="90" cy="90" r="78" fill="none" stroke="url(#resultGrad)" strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={`${percentage * 4.9} 490`} style={{ transition: 'stroke-dasharray 1.2s ease-out' }}/>
                <defs>
                  <linearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: '#a855f7', fontFamily: '"Outfit", sans-serif' }}>{percentage}%</span>
              </div>
            </div>

            <h2 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', animation: 'fadeSlideUp 0.5s ease-out 0.3s both' }}>
              {percentage >= 80 ? 'Genius!' : percentage >= 60 ? 'Brilliant!' : percentage >= 40 ? 'Nice Try!' : 'Keep Going!'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', margin: '0 0 32px 0', animation: 'fadeSlideUp 0.5s ease-out 0.4s both' }}>
              You scored <span style={{ color: '#a855f7', fontWeight: 700 }}>{score}</span> points
            </p>

            <div style={{ display: 'flex', gap: 20, marginBottom: 36, animation: 'fadeSlideUp 0.5s ease-out 0.5s both' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '18px 32px', borderRadius: 18, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: '"Outfit", sans-serif' }}>{correctAnswers}</div>
                <div style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Correct</div>
              </div>
              <div style={{ background: 'rgba(239,68,68,0.1)', padding: '18px 32px', borderRadius: 18, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', fontFamily: '"Outfit", sans-serif' }}>{questions.length - correctAnswers}</div>
                <div style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Missed</div>
              </div>
            </div>

            <button
              onClick={startGame}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                padding: '20px 56px',
                borderRadius: 20,
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 700,
                fontFamily: '"Outfit", sans-serif',
                cursor: 'pointer',
                boxShadow: '0 15px 40px rgba(139,92,246,0.4)',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                animation: 'fadeSlideUp 0.5s ease-out 0.6s both'
              }}
              onMouseOver={e => e.target.style.transform = 'scale(1.08) translateY(-3px)'}
              onMouseOut={e => e.target.style.transform = 'scale(1) translateY(0)'}
            >
              Play Again! 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}