import { NextFunction, Request } from "express";
import { Response } from "node-fetch";

export default class UserPolicies {
  public canAddUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.user. === "admin") {
      next();
    } else {
      res.status(403).send("You are not allowed to add a user");
    }
  }
}
