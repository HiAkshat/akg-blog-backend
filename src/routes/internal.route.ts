import AuthenticateController from '@/controllers/authenticate.controller';
import { Routes } from '@/interfaces/routes.interface';
import { asyncWrapper } from '@/utils/util';
import { Router } from 'express';
import multer from 'multer';

class InternalRoute implements Routes {
  public path = '/api/v1/internal';
  public router = Router();

  private authenticateController = new AuthenticateController();

  constructor() {
    this.initializeAuthRoutes(`${this.path}/user`);
  }

  private initializeAuthRoutes(prefix: string) {
    //INTERNAL API FOR SESSION VALIDATION. USED IN MIDDLEWARES
    // this.router.get(`${prefix}/validate-session`, asyncWrapper(this.authenticateController.validateSession));

    this.router.post(
      `${prefix}`,
      
      multer({ storage: multer.memoryStorage() }).fields([
        { name: 'profilePic', maxCount: 1 },
      ]),
      asyncWrapper(this.userController),
    );
  }
}

export default InternalRoute;
