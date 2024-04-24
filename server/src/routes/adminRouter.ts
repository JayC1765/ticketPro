import express, { Request, Response } from 'express';
import adminController from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.get('/allTickets', adminController.getAllTickets, (_req, res) => {
  res.status(200).json(res.locals.result);
});

adminRouter.get(
  '/allComments/:id',
  adminController.getAllComments,
  (_req, res) => {
    res.status(200);
  }
);

adminRouter.patch(
  '/updateTicket/:id',
  adminController.updateStatus,
  (_req, res) => {
    res.status(200);
  }
);

adminRouter.post(
  '/addComments/:id',
  adminController.addComment,
  (_req, res) => {
    res.status(200);
  }
);

export default adminRouter;
