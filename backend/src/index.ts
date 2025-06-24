import express from 'express';
import { createServer } from 'http';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './utils';
import { appRouter } from './routes';

const createContextHandler = ({ req, res }) => {
  return createContext({ req, res });
};

const app = express();
const server = createServer(app);

const tRPC = initTRPC.create({
  createContext: createContextHandler,
});

app.use('/trpc', tRPC.createExpressMiddleware({ router: appRouter }));

app.get('/', (req, res) => {
  res.send('Welcome to Readbish API');
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});