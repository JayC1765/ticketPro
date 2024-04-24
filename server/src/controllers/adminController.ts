import { Request, Response, NextFunction } from 'express';
import { UpdateStatusRequest } from '../types/types';
import query from '../models/models';

const adminController = {
  async getAllTickets(_req: Request, res: Response, next: NextFunction) {
    try {
      const getAllTicketsQuery = `
        SELECT * FROM tickets
        ORDER BY timestamp ASC, status ASC;
      `;

      const result = await query(getAllTicketsQuery);
      const tickets = result.rows;

      res.status(200).json(tickets);
    } catch (err) {
      console.log(`Error while querying all tickets: `, err);
      next(err);
    }
  },

  async updateStatus(
    req: UpdateStatusRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updateStatusQuery = `
        UPDATE tickets
        SET status = $1
        WHERE id = $2;
      `;

      await query(updateStatusQuery, [status, id]);

      res.status(200).json({ message: 'Ticket status updated successfully' });
    } catch (err) {
      console.log(`Error while updating ticket status: `, err);
      next(err);
    }
  },
};

export default adminController;
