import express from 'express';
import customerController from '../controllers/customerController';

const customerRouter = express.Router();

customerRouter.post(
  '/create-ticket',
  customerController.createTicket,
  (_req, res) => {
    res.status(200).json(res.locals.result);
  }
);

export default customerRouter;
