import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getRole, roles } from './roles';
import { questionFallback } from './questionFallback';
import './styles.css';

const FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSdKIxtiE9OoJ-woZQR5TV3-PxAWCrO1-YcirrcXoARikM_bVQ/viewform?usp=publish-editor';

function route() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const match = path.match(/^\/role\/(\d+)$/);
  if (match) return { page: 'question', roleId: Number(match[1]) };
  if (path === '/submit') return { page: 'submit' };
  return { page: 'home' };
}

function Layout({ children, eyebrow = 'Aurora Theatre presents' }) {
  return <div className="app-shell"><header className="topbar"><a className="brand" href="/" aria-label="OCTA home"><span className="brand-orb" /> OCTA</a><span className="topbar-note">LIVE EVENT / 01</span></header>{children}<footer className="footer"><span>OCTA</span><span>{eyebrow}</span></footer></div>;
}

function Home() {
  const [team, setTeam] = useState(new URLSearchParams(window.location.search).get('team') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function enterRole(roleId) {
    setLoading(roleId); setError('');
    try {
      const response = await fetch('/api/role/select', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ teamId: team || 'UNASSIGNED', roleId }) });
      if (!response.ok) throw new Error('selection');
      const data = await response.json();
      window.location.href = data.redirectUrl;
    } catch {
      window.location.href = `/role/${roleId}${team ? `?team=${encodeURIComponent(team)}` : ''}`;
    }
  }

  return <Layout><main className="home-page"><section className="intro reveal"><img className="aurora-logo" src="/assets/auroraLogo.jpeg" alt="Aurora The Theatrical Group" /><p className="eyebrow">An interactive team mystery</p><h1>OCTA</h1><p className="intro-copy">8 Minds. 1 Mission.</p><div className="entry-row"><label htmlFor="team">Team marker <span>(optional)</span></label><input id="team" value={team} onChange={(event) => setTeam(event.target.value)} placeholder="TEAM-07" maxLength="20" /></div></section><section className="role-section"><div className="section-heading"><p className="eyebrow">Choose your role</p><p className="section-count">08 stations / 01 mission</p></div><div className="role-grid">{roles.map((role, index) => <RoleCard key={role.id} role={role} index={index} loading={loading === role.id} onEnter={enterRole} />)}</div>{error && <p className="error-text">Something went wrong. Please try again.</p>}</section><section className="final-submission reveal"><p className="eyebrow">Final submission</p><h2>Solved all 8 roles?</h2><p>Build your 8-digit code using the option numbers in Role 1 → Role 8 order.</p><strong>TEAM NUMBER + 8-DIGIT CODE</strong><a className="button final-submission-button" href={FORM_URL} target="_blank" rel="noreferrer">Final submission <span>↗</span></a><p className="submission-warning">Check your code before submitting.<br />Your submission cannot be changed after submission.</p><div className="winner-note"><p className="eyebrow">Who wins?</p><p><strong>The team with the earliest correct submission wins OCTA.</strong></p><p>The winning submission must contain the correct Team Number and correct 8-digit code. Incorrect submissions do not count as the winning submission.</p></div></section></main></Layout>;
}

function RoleCard({ role, index, loading, onEnter }) {
  return <article className={`role-card accent-${role.accent} reveal`} style={{ '--delay': `${index * 55}ms` }}><div className="card-top"><span className="role-mark">{role.mark}</span><span className="role-icon" aria-hidden="true">{['+', '◌', '◆', '◈', '§', ')))', 'Aa', '⌁'][index]}</span></div><h2>{role.name}</h2><p>{role.short}</p><button className="text-button" onClick={() => onEnter(role.id)} disabled={loading}>{loading ? 'Opening...' : 'Enter station'} <span aria-hidden="true">↗</span></button></article>;
}

function QuestionPage({ roleId }) {
  const role = getRole(roleId);
  const query = new URLSearchParams(window.location.search);
  const organizerMode = roleId === 4 && query.get('organizer') === '1';
  const puzzleVersion = query.get('puzzle') === 'backup' ? 'backup' : 'primary';
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answerError, setAnswerError] = useState(false);
  const [failed, setFailed] = useState(false);
  const team = new URLSearchParams(window.location.search).get('team');

  useEffect(() => {
    let active = true;
    fetch(`/api/question/${roleId}`).then((response) => { if (!response.ok) throw new Error('question'); return response.json(); }).then((data) => active && setQuestion(data)).catch(() => active && setQuestion(questionFallback[roleId]));
    return () => { active = false; };
  }, [roleId]);

  if (!role) return <Layout><main className="state-page"><p className="eyebrow">Station unavailable</p><h1>That role does not exist.</h1><a className="button" href="/">Return to stations</a></main></Layout>;
  if (!question) return <Layout><main className="state-page"><div className="spinner" /><p>Loading challenge...</p></main></Layout>;

  const activePuzzle = roleId === 4 ? question[puzzleVersion === 'backup' ? 'backupPuzzle' : 'primaryPuzzle'] : null;
  const puzzleImage = activePuzzle?.image || question.image;
  const correctAnswer = activePuzzle?.correctAnswer || question.correctAnswer;
  const selectedOptionNumber = question.answerType === 'letter'
    ? question.options.findIndex((option) => option.id === selected) + 1
    : selected;

  function confirm() {
    if (!selected) return;
    if (question.answerType === 'letter') {
      if (correctAnswer && selected.trim().toUpperCase() === correctAnswer.toUpperCase()) setConfirmed(true);
      else setAnswerError(true);
      return;
    }
    setConfirmed(true);
  }
  return <Layout><main className={`question-page role-theme-${role.accent}`}><div className="question-head reveal"><a className="back-link" href={`/${team ? `?team=${encodeURIComponent(team)}` : ''}`}>← All stations</a><div className="question-label"><span>ROLE {String(roleId).padStart(2, '0')}</span><span>TEAM {team || '—'}</span></div><h1>{question.roleName}</h1><p className="mission">{question.description}</p></div><section className="challenge-panel reveal">{organizerMode && <div className="organizer-panel"><p className="rules-title">Organizer only</p><strong>Choose Puzzle Version</strong><p>Use the Bollywood backup only if the team does not have anyone comfortable with Kannada/Kannada cinema.</p><div className="organizer-actions"><a className="button" href="/role/4?puzzle=kannada">Kannada movie</a><a className="button" href="/role/4?puzzle=backup">Bollywood backup</a></div></div>}<div className="panel-kicker"><span>CHALLENGE / {question.title}</span><span className="status-dot">● LIVE</span></div>{question.rules && <div className="rules-block"><p className="rules-title">Rules</p><ol>{question.rules.map((rule) => <li key={rule}>{rule}</li>)}</ol><p className="general-rule">{question.generalRule}</p></div>}{puzzleImage && <img className="challenge-image" src={puzzleImage} alt={`${question.title} puzzle`} />}<p className="challenge-question">{question.question}</p>{question.statements && <ol className="statements-list">{question.statements.map((statement, index) => <li key={statement}><span>{index + 1}.</span>{statement}</li>)}</ol>}{question.words && <div className="word-list">{question.words.map((word, index) => <div className="word-item" key={word}><span>{index + 1}</span><strong>{word}</strong></div>)}</div>}<div className="options" role="radiogroup" aria-label="Challenge options">{question.options?.map((option, index) => <button key={option.id} className={`option ${selected === option.id ? 'selected' : ''}`} onClick={() => !confirmed && setSelected(option.id)} role="radio" aria-checked={selected === option.id} disabled={confirmed}><span className="option-number">{question.answerType === 'letter' ? index + 1 : option.id}</span><span>{option.text}</span><span className="option-check" aria-hidden="true">{selected === option.id ? '✓' : ''}</span></button>)}</div>{!confirmed ? <button className="button confirm-button" onClick={confirm} disabled={!selected}>Confirm answer <span>↗</span></button> : <div className="digit-reveal"><p className="eyebrow">Answer recovered</p><strong>{`Option ${selectedOptionNumber}`}</strong><p>Carry this answer back to your team. The system will not assemble the final code.</p></div>}</section><div className="question-progress"><span>Station {roleId} of 8</span><span className="progress-track"><i style={{ width: `${(roleId / 8) * 100}%` }} /></span></div></main></Layout>;
}

function SubmitPage() {
  const [code, setCode] = useState('');
  const [team, setTeam] = useState('');
  const valid = /^\d{8}$/.test(code);
  return <Layout eyebrow="Final transmission"><main className="submit-page reveal"><p className="eyebrow">System access / final transmission</p><h1>Recover the<br /><em>winning code.</em></h1><p className="submit-copy">Bring all eight digits together with your team. Enter them once, carefully, then continue to the official submission form.</p><div className="code-slots" aria-label="Final eight digit code">{Array.from({ length: 8 }, (_, index) => <span key={index}>{code[index] || '_'}</span>)}</div><label className="field-label" htmlFor="code">Final 8-digit code</label><input id="code" className="code-input" inputMode="numeric" pattern="[0-9]*" maxLength="8" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} placeholder="00000000" /><label className="field-label" htmlFor="submit-team">Team number</label><select id="submit-team" className="code-input" value={team} onChange={(event) => setTeam(event.target.value)}><option value="">Select your team</option>{Array.from({ length: 20 }, (_, index) => <option key={index + 1}>Team {index + 1}</option>)}</select><a className={`button submit-button ${!valid || !team ? 'disabled' : ''}`} href={valid && team ? FORM_URL : undefined} onClick={(event) => { if (!valid || !team) event.preventDefault(); }} target="_blank" rel="noreferrer">Submit final code <span>↗</span></a><p className="submit-note">Your timestamp is recorded by the official Google Form.</p></main></Layout>;
}

function App() { const current = route(); if (current.page === 'question') return <QuestionPage roleId={current.roleId} />; if (current.page === 'submit') return <SubmitPage />; return <Home />; }

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
