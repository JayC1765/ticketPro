export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface Ticket {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  status: TicketStatus;
  timestamp: string;
}

export enum TicketStatus {
  NEW = 'new',
  IN_PROGRESS = 'in progress',
  RESOLVED = 'resolved',
}

export interface Comment {
  id: number;
  ticket_id: number;
  comment: string;
  timestamp: string;
  username: string;
}
