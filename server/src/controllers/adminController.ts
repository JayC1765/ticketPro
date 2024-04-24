import { Request, Response, NextFunction } from 'express';
import {
  UpdateStatusRequest,
  AddCommentRequest,
  GetCommentsRequest,
} from '../types/types';
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
      const { comment, username } = req.body;

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
        INSERT INTO comments (ticket_id, comment, username)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const commentResult = await query(addCommentQuery, [
        id,
        comment,
        username,
      ]);
      const newComment = commentResult.rows[0];

      res
        .status(200)
        .json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
      console.log('Error while adding comment:', err);
      next(err);
    }
  },

  async getAllComments(
    req: GetCommentsRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const checkTicketQuery = `
        SELECT * FROM tickets
        WHERE id = $1;
      `;
      const ticketResult = await query(checkTicketQuery, [id]);
      const ticket = ticketResult.rows[0];

      if (!ticket) {
        res.status(404).json({ error: 'Ticket not found' });
        return;
      }

      // Retrieve all comments associated with the ticket ID
      const getAllCommentsQuery = `
        SELECT * FROM comments
        WHERE ticket_id = $1;
      `;
      const commentResult = await query(getAllCommentsQuery, [id]);
      const comments = commentResult.rows;

      res.status(200).json(comments);
    } catch (err) {
      console.log('Error while retrieving comments:', err);
      next(err);
    }
  },
};

export default adminController;
