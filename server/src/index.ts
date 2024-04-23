import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import customerRouter from './routes/customerRouter';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));

  app.get('/', (_req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../../client/index.html'))
  );
}

app.use('/customers', customerRouter);

// catch-all route handler for any requests to an unknown route
app.use((_req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
