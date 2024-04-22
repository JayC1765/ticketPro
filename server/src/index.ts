import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')));

  app.get('/', (_req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../../client/index.html'))
  );
}

// catch-all route handler for any requests to an unknown route
app.use((_req, res: Response) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
