import { User } from '@/interfaces/user.interface';

export {};

declare global {
  namespace Express {
    export interface Response {
      sendformat: <Data>(data: Data, code?: number) => Response;
    }

    export interface Request {
      user: User;
    }
  }
}
