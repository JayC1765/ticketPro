import { Request, Response, NextFunction } from 'express';
import { UpdateStatusRequest, AddCommentRequest } from '../types/types';
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

  async addComment(req: AddCommentRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { description, username } = req.body;

      // Check if ticket with the provided ID exists
      const checkTicketQuery = `
        SELECT * FROM tickets
        WHERE id = $1;
      `;
      const ticketResult = await query(checkTicketQuery, [id]);
      const ticket = ticketResult.rows[0];

      if (!ticket) {
        res.status(404).json({ error: 'Ticket not found' });
      }

      // Insert comment into the database
      const addCommentQuery = `
        INSERT INTO comments (ticket_id, description, username)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const commentResult = await query(addCommentQuery, [
        id,
        description,
        username,
      ]);
      const newComment = commentResult.rows[0];
      console.log('This is the new Comment ', newComment);

      res
        .status(200)
        .json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
      console.log('Error while adding comment:', err);
      next(err);
    }
  },
};

export default adminController;
