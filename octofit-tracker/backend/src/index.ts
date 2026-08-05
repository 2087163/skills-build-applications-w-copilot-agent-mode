import express from 'express';
import './config/database';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'OctoFit Tracker API', port });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
