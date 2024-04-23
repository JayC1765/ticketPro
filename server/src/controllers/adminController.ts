import { Request, Response, NextFunction } from 'express';
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
};

export default adminController;
