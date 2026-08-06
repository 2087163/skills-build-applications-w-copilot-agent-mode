import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const navItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Mergington High School</p>
          <h1>OctoFit Tracker</h1>
          <p className="lead">
            Keep students moving with quick logging, friendly competition, and
            personalized fitness goals.
          </p>
        </div>
        <div className="hero-badge">Live challenge: 42 points</div>
      </header>

      <nav className="nav-pills" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-pill">
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-area">
        <Routes>
          <Route
            path="/"
            element={
              <section className="dashboard-grid">
                <article className="card highlight-card">
                  <p className="eyebrow">Today&apos;s focus</p>
                  <h2>Build momentum with one quick activity log</h2>
                  <p>
                    Students can capture runs, walks, and strength sessions in
                    seconds and compare progress with peers.
                  </p>
                </article>
                <article className="card stat-card">
                  <p className="eyebrow">Active students</p>
                  <h2>128</h2>
                  <p>Up 14% from last week</p>
                </article>
                <article className="card stat-card">
                  <p className="eyebrow">Team streak</p>
                  <h2>7 days</h2>
                  <p>Blue Falcons lead the challenge</p>
                </article>
              </section>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
