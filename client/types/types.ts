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
  description: string;
  status: string;
  timestamp: string;
}
