import { Request, Response, NextFunction } from 'express';
import { TicketType } from '../types/types';
import query from '../models/models';

const customerController = {
  async createTicket(
    req: Request<{}, {}, TicketType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { firstName, lastName, email, description } = req.body;

      const insertTicketQuery = `
        INSERT INTO tickets (firstName, lastName, email, description, status)
        VALUES ($1, $2, $3, $4, 'new')
        RETURNING *;`;

      const result = await query(insertTicketQuery, [
        firstName,
        lastName,
        email,
        description,
      ]);

      res.locals.result = {
        isSuccess: true,
        data: result.rows[0],
      };
      return next();
    } catch (err) {
      console.log(`Error while creating a new ticket: `, err.message);
      next(err);
    }
  },
};

export default customerController;
