// Modules
import { Router } from 'express';
// Controllers

// Interfaces
import { Routes } from '@/interfaces/routes.interface';
// Middlewares
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import SessionMiddleware from '@/middlewares/session.middleware';
// Validators
import {
  userSignupBodyParser,
  authenticateControllerBodyParser,
  sendOtpBodyParser,
  verifyOtpBodyParser,
} from '@/controllers/validators/authenticate.controller.validation';
import { createSchoolSchema } from '@/controllers/validators/school.controller.validation';
// Utils
import { asyncWrapper } from '@/utils/util';

class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public router = Router();

  // Middlewares
  private validatorMiddleware = new ValidatorMiddleware();
  private sessionMiddleware = new SessionMiddleware();
  // Controllers


  constructor() {

    this.initializeAuthRoutes(`${this.path}/auth`);
  }

  private initializeAuthRoutes(prefix: string) {
    //API FOR USER SIGNUP
    this.router.post(
      `${prefix}/signup`,
      this.sessionMiddleware.validate,
      this.validatorMiddleware.validateRequestBody(userSignupBodyParser),
      // asyncWrapper(this.authenticateController.userSignup),
    );

  }
}

export default ExternalRoute;
