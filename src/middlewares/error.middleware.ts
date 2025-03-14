import { NextFunction, Request, Response } from 'express';
// import { logger } from '@utils/logger';
import { HandledError } from '@/exceptions/HandledError';
import { UserError } from '@/exceptions/UserError';
import { NotFoundError } from '@/exceptions/NotFoundError';
import { ZodError } from 'zod';
import * as Sentry from '@sentry/node';
// import { IExtendedError } from '@/typings/common';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    if (error instanceof HandledError) {
      return res.status(status).json({
        errors: [
          {
            error_code: status,
            title: message,
          },
        ],
      });
    } else if (error instanceof UserError) {
      return res.status(status).json({
        error: message,
      });
    } else if (error instanceof ZodError) {
      return res.status(501).send({
        code: 501,
        errors: error.issues,
      });
    } else if (error instanceof NotFoundError) {
      res.status(status).send({
        errors: [
          {
            error_code: status,
            title: message,
          },
        ],
      });
      throw error;
    } else {
      res.status(status).send({
        code: 500,
        errors: [
          {
            error_code: status,
            title: message || 'OOPs! Something went wrong.',
          },
        ],
      });
      throw error;
    }
  } catch (err) {
    Sentry.captureException(err);
    next(err);
  }
};

export default errorMiddleware;
