import express from 'express';
import './config/database.js';
import apiRoutes from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
  res.json({ status: 'OctoFit Tracker API', port, baseUrl });
});

app.listen(port, () => {
  console.log(`Backend listening on ${baseUrl}`);
});
