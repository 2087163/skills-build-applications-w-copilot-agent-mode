const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

export default function Workouts() {
  return (
    <section>
      <h2>Workouts</h2>
      <p>API endpoint: {apiUrl}</p>
    </section>
  );
}
