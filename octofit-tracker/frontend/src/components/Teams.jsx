const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

export default function Teams() {
  return (
    <section>
      <h2>Teams</h2>
      <p>API endpoint: {apiUrl}</p>
    </section>
  );
}
