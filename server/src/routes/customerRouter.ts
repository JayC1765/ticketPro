import express, { Request, Response } from 'express';
import customerController from '../controllers/customerController';

const customerRouter = express.Router();

customerRouter.post(
  '/create-ticket',
  customerController.createTicket,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.result);
  }
);

export default customerRouter;
