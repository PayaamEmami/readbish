import express from 'express';
import { createServer } from 'http';
import router from './routes';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});