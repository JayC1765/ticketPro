import express, { Request, Response } from 'express';
import adminController from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.get('/allTickets', adminController.getAllTickets, (_req, res) => {
  res.status(200).json(res.locals.result);
});

export default adminRouter;
