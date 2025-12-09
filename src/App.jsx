import { useState, useEffect } from 'react';

const floatingShapes = Array.from({ length: 8 }, (_, i) => ({
  id: i, size: 20 + Math.random() * 40, left: Math.random() * 100, top: Math.random() * 100,
  duration: 8 + Math.random() * 8, delay: Math.random() * 4, type: ['circle', 'square'][Math.floor(Math.random() * 2)]
}));

const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
  id: i, x: 50 + (Math.random() - 0.5) * 10,
  color: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'][Math.floor(Math.random() * 6)],
  delay: Math.random() * 0.2, duration: 0.8 + Math.random() * 0.8, spread: (Math.random() - 0.5) * 250, isCircle: Math.random() > 0.5
}));

const level1Questions = [
  { category: "Science", question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1, icon: "🔴" },
  { category: "Geography", question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2, icon: "🗼" },
  { category: "Nature", question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correct: 1, icon: "🕷️" },
  { category: "Food", question: "What fruit is known as the 'king of fruits'?", options: ["Apple", "Mango", "Durian", "Banana"], correct: 2, icon: "👑" },
  { category: "Music", question: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], correct: 2, icon: "🎸" },
];

const level2Questions = [
  { category: "Science", question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Titanium", "Quartz"], correct: 1, icon: "💎" },
  { category: "Geography", question: "Which country has the most islands in the world?", options: ["Indonesia", "Philippines", "Sweden", "Finland"], correct: 2, icon: "🏝️" },
  { category: "History", question: "In what year did the Titanic sink?", options: ["1905", "1912", "1920", "1898"], correct: 1, icon: "🚢" },
  { category: "Space", question: "How many planets in our solar system have rings?", options: ["1", "2", "3", "4"], correct: 3, icon: "🪐" },
  { category: "Tech", question: "What year was the first iPhone released?", options: ["2005", "2006", "2007", "2008"], correct: 2, icon: "📱" },
];

const level3Questions = [
  { category: "Science", question: "What is the chemical symbol for Tungsten?", options: ["Tu", "W", "Tg", "Tn"], correct: 1, icon: "⚗️" },
  { category: "Nature", question: "What animal has the longest lifespan?", options: ["Elephant", "Galápagos Tortoise", "Bowhead Whale", "Greenland Shark"], correct: 3, icon: "🦈" },
  { category: "History", question: "In which year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2, icon: "🧱" },
  { category: "Cinema", question: "What was the first fully CGI animated feature film?", options: ["Shrek", "Toy Story", "A Bug's Life", "Finding Nemo"], correct: 1, icon: "🎬" },
  { category: "Music", question: "Which classical composer was deaf?", options: ["Mozart", "Bach", "Beethoven", "Chopin"], correct: 2, icon: "🎼" },
];

const levels = [
  { id: 1, name: "Rookie", questions: level1Questions, color: "#10b981", gradient: "radial-gradient(ellipse at top, #a7f3d0 0%, #34d399 50%, #10b981 100%)", icon: "🌱", timePerQuestion: 20 },
  { id: 2, name: "Challenger", questions: level2Questions, color: "#f59e0b", gradient: "radial-gradient(ellipse at top, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)", icon: "⚡", timePerQuestion: 15 },
  { id: 3, name: "Master", questions: level3Questions, color: "#ef4444", gradient: "radial-gradient(ellipse at top, #fecaca 0%, #f87171 50%, #ef4444 100%)", icon: "🔥", timePerQuestion: 12 }
];

const FloatingShapes = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {floatingShapes.map(s => (
      <div key={s.id} style={{ position: 'absolute', width: s.size, height: s.size, left: `${s.left}%`, top: `${s.top}%`,
        opacity: 0.15, background: '#fff', borderRadius: s.type === 'circle' ? '50%' : '8px',
        animation: `floatShape ${s.duration}s ease-in-out infinite`, animationDelay: `${s.delay}s` }} />
    ))}
  </div>
);

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
      {confettiParticles.map(p => (
        <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: '45%', width: 8, height: 8, background: p.color,
          borderRadius: p.isCircle ? '50%' : '2px', animation: `confettiBurst ${p.duration}s ease-out ${p.delay}s forwards`, '--spread': `${p.spread}px` }} />
      ))}
    </div>
  );
};

const StarBurst = ({ active }) => {
  if (!active) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', fontSize: 30, animation: 'starBurst 1s ease-out forwards', '--angle': `${i * 30}deg` }}>⭐</div>
      ))}
    </div>
  );
};

const HomeButton = ({ onClick }) => (
  <button onClick={onClick} style={{ position: 'absolute', top: 20, left: 20, width: 50, height: 50, borderRadius: 16,
    background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'all 0.3s ease', zIndex: 100, fontSize: 24 }}
    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)'}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>🏠</button>
);

const ProgressDots = ({ total, current }) => (
  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4,
        background: i <= current ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'all 0.4s ease',
        boxShadow: i === current ? '0 2px 10px rgba(255,255,255,0.4)' : 'none' }} />
    ))}
  </div>
);

const LifelineButton = ({ icon, label, onClick, disabled, used }) => (
  <button onClick={onClick} disabled={disabled || used} style={{
    background: used ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.95)', border: 'none', borderRadius: 12, padding: '8px 12px',
    cursor: disabled || used ? 'not-allowed' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    boxShadow: used ? 'none' : '0 4px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', opacity: used ? 0.5 : 1 }}
    onMouseOver={e => !disabled && !used && (e.currentTarget.style.transform = 'scale(1.1)')}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
    <span style={{ fontSize: 24 }}>{icon}</span>
    <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>{label}</span>
  </button>
);

const LevelCard = ({ level, unlocked, completed, onSelect, stars }) => (
  <button onClick={() => unlocked && onSelect(level)} disabled={!unlocked} style={{
    background: unlocked ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
    border: `3px solid ${unlocked ? level.color : '#94a3b8'}`, borderRadius: 24, padding: '24px 20px',
    cursor: unlocked ? 'pointer' : 'not-allowed', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    boxShadow: unlocked ? `0 10px 30px ${level.color}40` : 'none', transition: 'all 0.3s ease',
    opacity: unlocked ? 1 : 0.7, minWidth: 140, position: 'relative' }}
    onMouseOver={e => unlocked && (e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)')}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
    {!unlocked && <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 28 }}>🔒</div>}
    {completed && <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 28 }}>✅</div>}
    <span style={{ fontSize: 40 }}>{level.icon}</span>
    <span style={{ fontSize: 18, fontWeight: 800, color: unlocked ? level.color : '#94a3b8' }}>Level {level.id}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>{level.name}</span>
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3].map(i => <span key={i} style={{ fontSize: 16, opacity: stars >= i ? 1 : 0.3 }}>⭐</span>)}
    </div>
    <span style={{ fontSize: 11, color: '#94a3b8' }}>{level.timePerQuestion}s per question</span>
  </button>
);

export default function TriviaQuiz() {
  const [gameState, setGameState] = useState('start');
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [skipUsed, setSkipUsed] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [extraTimeUsed, setExtraTimeUsed] = useState(false);
  
  const [levelProgress, setLevelProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('brainBurstProgress');
      return saved ? JSON.parse(saved) : { 1: { unlocked: true, completed: false, stars: 0 }, 2: { unlocked: false, completed: false, stars: 0 }, 3: { unlocked: false, completed: false, stars: 0 } };
    } catch { return { 1: { unlocked: true, completed: false, stars: 0 }, 2: { unlocked: false, completed: false, stars: 0 }, 3: { unlocked: false, completed: false, stars: 0 } }; }
  });

  useEffect(() => { try { localStorage.setItem('brainBurstProgress', JSON.stringify(levelProgress)); } catch {} }, [levelProgress]);

  useEffect(() => {
    if (gameState === 'playing' && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) handleAnswer(-1);
  }, [timeLeft, gameState, showResult]);

  const selectLevel = (level) => {
    setCurrentLevel(level); setGameState('playing'); setCurrentQuestion(0); setScore(0); setCorrectAnswers(0);
    setSelectedAnswer(null); setShowResult(false); setTimeLeft(level.timePerQuestion); setStreak(0); setMaxStreak(0);
    setHiddenOptions([]); setSkipUsed(false); setFiftyFiftyUsed(false); setExtraTimeUsed(false);
  };

  const goHome = () => { setGameState('start'); setShowConfetti(false); setCurrentLevel(null); };

  const useFiftyFifty = () => {
    if (fiftyFiftyUsed || showResult) return;
    setFiftyFiftyUsed(true);
    const currentQ = currentLevel.questions[currentQuestion];
    const wrongOptions = [0, 1, 2, 3].filter(i => i !== currentQ.correct);
    setHiddenOptions(wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2));
  };

  const useExtraTime = () => { if (extraTimeUsed || showResult) return; setExtraTimeUsed(true); setTimeLeft(prev => prev + 10); };
  const useSkip = () => { if (skipUsed || showResult) return; setSkipUsed(true); nextQuestion(); };

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index); setShowResult(true);
    const currentQ = currentLevel.questions[currentQuestion];
    if (index === currentQ.correct) {
      const points = 100 + (timeLeft * 10) + (streak >= 2 ? streak * 20 : 0);
      setScore(score + points); setCorrectAnswers(correctAnswers + 1); setStreak(streak + 1); setMaxStreak(Math.max(maxStreak, streak + 1));
      setShowConfetti(true);
      if (streak >= 2) { setShowStarBurst(true); setTimeout(() => setShowStarBurst(false), 1000); }
      setTimeout(() => setShowConfetti(false), 1200);
    } else setStreak(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentLevel.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false);
      setTimeLeft(currentLevel.timePerQuestion); setHiddenOptions([]);
    } else {
      const pct = Math.round((correctAnswers / currentLevel.questions.length) * 100);
      const stars = pct === 100 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;
      setLevelProgress(prev => {
        const np = { ...prev };
        np[currentLevel.id] = { ...np[currentLevel.id], completed: pct === 100 || np[currentLevel.id].completed, stars: Math.max(np[currentLevel.id].stars, stars) };
        if (pct === 100 && currentLevel.id < 3) np[currentLevel.id + 1] = { ...np[currentLevel.id + 1], unlocked: true };
        return np;
      });
      setGameState('result');
    }
  };

  const resetProgress = () => setLevelProgress({ 1: { unlocked: true, completed: false, stars: 0 }, 2: { unlocked: false, completed: false, stars: 0 }, 3: { unlocked: false, completed: false, stars: 0 } });

  const percentage = currentLevel ? Math.round((correctAnswers / currentLevel.questions.length) * 100) : 0;
  const currentQ = currentLevel?.questions[currentQuestion];
  const isPerfect = percentage === 100;

  return (
    <div style={{ minHeight: '100vh', height: '100%', width: '100%',
      background: gameState === 'playing' && currentLevel ? currentLevel.gradient : gameState === 'result' ? (isPerfect ? 'radial-gradient(ellipse at top, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)' : 'radial-gradient(ellipse at top, #fdf4ff 0%, #fae8ff 50%, #e879f9 100%)') : 'radial-gradient(ellipse at top, #dbeafe 0%, #93c5fd 50%, #3b82f6 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', position: 'relative', overflow: 'auto', transition: 'background 0.6s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html,body,#root{height:100%;width:100%;overflow-x:hidden}
        @keyframes floatShape{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(10deg)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounceIn{0%{opacity:0;transform:scale(0.5)}70%{transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes confettiBurst{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1}100%{transform:translate(var(--spread),-300px) rotate(720deg) scale(0);opacity:0}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.05);opacity:0.8}}
        @keyframes wiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes popIn{0%{opacity:0;transform:scale(0)}70%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}
        @keyframes starBurst{0%{transform:rotate(var(--angle)) translateY(0) scale(1);opacity:1}100%{transform:rotate(var(--angle)) translateY(-150px) scale(0);opacity:0}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(255,255,255,0.5)}50%{box-shadow:0 0 40px rgba(255,255,255,0.8)}}
        .option-btn{transition:all 0.3s ease}.option-btn:hover:not(:disabled){transform:translateX(8px) scale(1.02)}
      `}</style>

      <FloatingShapes /><Confetti active={showConfetti} /><StarBurst active={showStarBurst} />
      {gameState !== 'start' && <HomeButton onClick={goHome} />}

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '30px 20px', position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {gameState === 'start' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 110, height: 110, borderRadius: 32, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28,
              boxShadow: '0 20px 50px rgba(139,92,246,0.5)', animation: 'bounceIn 0.6s ease-out, float 3s ease-in-out infinite 0.6s' }}>
              <span style={{ fontSize: 52 }}>🧠</span>
            </div>
            <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(2.5rem,9vw,3.5rem)', fontWeight: 800, color: '#fff',
              margin: '0 0 12px 0', textAlign: 'center', textShadow: '0 4px 20px rgba(0,0,0,0.2)', animation: 'fadeSlideUp 0.6s ease-out 0.2s both' }}>Brain Burst</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', textAlign: 'center', margin: '0 0 40px 0', animation: 'fadeSlideUp 0.6s ease-out 0.3s both' }}>
              Complete each level with 100% to unlock the next!</p>
            <div style={{ display: 'flex', gap: 16, marginBottom: 30, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeSlideUp 0.6s ease-out 0.4s both' }}>
              {levels.map(level => <LevelCard key={level.id} level={level} unlocked={levelProgress[level.id].unlocked}
                completed={levelProgress[level.id].completed} stars={levelProgress[level.id].stars} onSelect={selectLevel} />)}
            </div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 20, animation: 'fadeSlideUp 0.6s ease-out 0.5s both' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{Object.values(levelProgress).filter(l => l.completed).length}/3</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Completed</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{Object.values(levelProgress).reduce((a, l) => a + l.stars, 0)}/9</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Stars</div>
              </div>
            </div>
            <button onClick={resetProgress} style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', padding: '10px 20px',
              borderRadius: 12, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseOver={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = '#fff'; }}
              onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = 'rgba(255,255,255,0.7)'; }}>Reset Progress</button>
          </div>
        )}

        {gameState === 'playing' && currentLevel && (
          <div style={{ paddingTop: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.95)', padding: '8px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{currentLevel.icon}</span>
                <span style={{ fontWeight: 700, color: currentLevel.color }}>Level {currentLevel.id}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.95)', padding: '10px 20px', borderRadius: 14, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: currentLevel.color }}>⭐ {score}</span>
              </div>
            </div>
            {streak >= 2 && (
              <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '8px 16px', borderRadius: 20,
                marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, animation: 'shake 0.3s ease-in-out, glow 1s ease-in-out infinite' }}>
                <span style={{ fontSize: 20 }}>🔥</span><span style={{ color: '#fff', fontWeight: 800 }}>{streak} STREAK!</span>
                <span style={{ color: '#fef3c7', fontSize: 12 }}>+{streak * 20} bonus</span>
              </div>
            )}
            <ProgressDots total={currentLevel.questions.length} current={currentQuestion} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%',
                background: timeLeft <= 5 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: timeLeft <= 5 ? '0 8px 30px rgba(239,68,68,0.5)' : '0 8px 25px rgba(0,0,0,0.12)',
                animation: timeLeft <= 5 ? 'pulse 0.5s ease-in-out infinite' : 'none' }}>
                <span style={{ color: timeLeft <= 5 ? '#fff' : currentLevel.color, fontSize: '1.5rem', fontWeight: 800 }}>{timeLeft}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
              <LifelineButton icon="✂️" label="50/50" onClick={useFiftyFifty} disabled={showResult} used={fiftyFiftyUsed} />
              <LifelineButton icon="⏰" label="+10s" onClick={useExtraTime} disabled={showResult} used={extraTimeUsed} />
              <LifelineButton icon="⏭️" label="Skip" onClick={useSkip} disabled={showResult} used={skipUsed} />
            </div>
            <div style={{ borderRadius: 24, marginBottom: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.2)', background: 'rgba(255,255,255,0.95)',
              border: '4px solid rgba(255,255,255,0.5)', animation: 'bounceIn 0.5s ease-out', padding: '28px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 140, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 12, left: 12, background: currentLevel.color, color: '#fff',
                width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>{currentQuestion + 1}</div>
              <div style={{ fontSize: 48, marginBottom: 8, animation: 'wiggle 1s ease-in-out infinite' }}>{currentQ.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: currentLevel.color, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{currentQ.category}</h3>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.1rem,4vw,1.4rem)', fontWeight: 700, textAlign: 'center',
              lineHeight: 1.4, margin: '0 0 24px 0', textShadow: '0 2px 15px rgba(0,0,0,0.2)', animation: 'fadeSlideUp 0.5s ease-out' }}>{currentQ.question}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentQ.options.map((option, index) => {
                if (hiddenOptions.includes(index) && !showResult) return null;
                const isCorrect = index === currentQ.correct, isSelected = selectedAnswer === index;
                let bg = 'rgba(255,255,255,0.95)', textColor = '#1e293b', shadow = '0 6px 20px rgba(0,0,0,0.1)';
                if (showResult) {
                  if (isCorrect) { bg = 'linear-gradient(135deg, #10b981, #34d399)'; textColor = '#fff'; shadow = '0 10px 30px rgba(16,185,129,0.4)'; }
                  else if (isSelected) { bg = 'linear-gradient(135deg, #ef4444, #f87171)'; textColor = '#fff'; shadow = '0 10px 30px rgba(239,68,68,0.4)'; }
                }
                return (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className="option-btn"
                    style={{ background: bg, border: 'none', borderRadius: 16, padding: '16px 20px', textAlign: 'left',
                      cursor: showResult ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 14, boxShadow: shadow, animation: `slideInLeft 0.4s ease-out ${index * 0.08}s both` }}>
                    <span style={{ width: 38, height: 38, borderRadius: 12, background: showResult && (isCorrect || isSelected) ? 'rgba(255,255,255,0.25)' : `${currentLevel.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: showResult && (isCorrect || isSelected) ? '#fff' : currentLevel.color, fontSize: '0.95rem' }}>
                      {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : ['A','B','C','D'][index]}</span>
                    <span style={{ color: textColor, fontSize: '1.05rem', fontWeight: 600 }}>{option}</span>
                  </button>
                );
              })}
            </div>
            {showResult && (
              <button onClick={nextQuestion} style={{ width: '100%', marginTop: 20, background: 'rgba(255,255,255,0.95)', border: 'none',
                padding: 18, borderRadius: 16, color: currentLevel.color, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)', animation: 'bounceIn 0.4s ease-out', transition: 'transform 0.2s ease' }}
                onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} onMouseOut={e => e.target.style.transform = 'translateY(0)'}>
                {currentQuestion < currentLevel.questions.length - 1 ? 'Next Question →' : 'See Results! 🎉'}</button>
            )}
          </div>
        )}

        {gameState === 'result' && currentLevel && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
            <div style={{ fontSize: 80, marginBottom: 16, animation: 'bounceIn 0.6s ease-out' }}>
              {isPerfect ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '👏' : '💪'}</div>
            {isPerfect && currentLevel.id < 3 && (
              <div style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', padding: '12px 24px', borderRadius: 20, marginBottom: 20, animation: 'bounceIn 0.6s ease-out 0.2s both' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>🔓 Level {currentLevel.id + 1} Unlocked!</span>
              </div>
            )}
            <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 24, animation: 'bounceIn 0.6s ease-out 0.2s both' }}>
              <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="14"/>
                <circle cx="90" cy="90" r="78" fill="none" stroke={isPerfect ? '#f59e0b' : 'url(#resultGrad)'} strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={`${percentage * 4.9} 490`} style={{ transition: 'stroke-dasharray 1.2s ease-out' }}/>
                <defs><linearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: isPerfect ? '#f59e0b' : '#a855f7' }}>{percentage}%</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, animation: 'fadeSlideUp 0.5s ease-out 0.3s both' }}>
              {[1, 2, 3].map(i => <span key={i} style={{ fontSize: 36, opacity: (percentage === 100 ? 3 : percentage >= 80 ? 2 : percentage >= 60 ? 1 : 0) >= i ? 1 : 0.3,
                animation: (percentage === 100 ? 3 : percentage >= 80 ? 2 : percentage >= 60 ? 1 : 0) >= i ? `popIn 0.4s ease-out ${0.4 + i * 0.15}s both` : 'none' }}>⭐</span>)}
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', animation: 'fadeSlideUp 0.5s ease-out 0.3s both' }}>
              {isPerfect ? 'PERFECT!' : percentage >= 80 ? 'Brilliant!' : percentage >= 60 ? 'Nice Try!' : 'Keep Going!'}</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', margin: '0 0 8px 0', animation: 'fadeSlideUp 0.5s ease-out 0.4s both' }}>
              You scored <span style={{ color: currentLevel.color, fontWeight: 700 }}>{score}</span> points</p>
            {maxStreak >= 2 && <p style={{ color: '#f59e0b', fontSize: '0.95rem', margin: '0 0 24px 0' }}>🔥 Best streak: {maxStreak}</p>}
            <div style={{ display: 'flex', gap: 20, marginBottom: 30, animation: 'fadeSlideUp 0.5s ease-out 0.5s both' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '18px 32px', borderRadius: 18, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{correctAnswers}</div>
                <div style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Correct</div>
              </div>
              <div style={{ background: 'rgba(239,68,68,0.1)', padding: '18px 32px', borderRadius: 18, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>{currentLevel.questions.length - correctAnswers}</div>
                <div style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Missed</div>
              </div>
            </div>
            {!isPerfect && <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20, textAlign: 'center' }}>Get 100% to unlock the next level!</p>}
            <div style={{ display: 'flex', gap: 12, animation: 'fadeSlideUp 0.5s ease-out 0.6s both' }}>
              <button onClick={() => selectLevel(currentLevel)} style={{ background: currentLevel.gradient, border: 'none', padding: '18px 36px',
                borderRadius: 16, color: '#fff', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: `0 15px 40px ${currentLevel.color}40`, transition: 'all 0.3s ease' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05) translateY(-3px)'} onMouseOut={e => e.target.style.transform = 'scale(1)'}>Try Again 🔄</button>
              <button onClick={goHome} style={{ background: 'rgba(255,255,255,0.95)', border: 'none', padding: '18px 36px',
                borderRadius: 16, color: '#64748b', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'}>Levels 🏠</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}