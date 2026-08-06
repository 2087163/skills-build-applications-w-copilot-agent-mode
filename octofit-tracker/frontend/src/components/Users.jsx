const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

export default function Users() {
  return (
    <section>
      <h2>Users</h2>
      <p>API endpoint: {apiUrl}</p>
    </section>
  );
}
