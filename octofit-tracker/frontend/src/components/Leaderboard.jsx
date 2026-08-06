const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

export default function Leaderboard() {
  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API endpoint: {apiUrl}</p>
    </section>
  );
}
