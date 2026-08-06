const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

export default function Activities() {
  return (
    <section>
      <h2>Activities</h2>
      <p>API endpoint: {apiUrl}</p>
    </section>
  );
}
