import { Request } from 'express';

export type TicketType = {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
};

export interface UpdateStatusRequest extends Request {
  params: {
    id: string;
  };
  body: {
    status: string;
  };
}
