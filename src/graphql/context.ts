import { Request } from "express";

export const context = ({ req }: { req: Request }) => {
  const token = req.headers.authorization || "";
  // Decode token, get user info if needed
  return { token };
};
