import { jwtSecretKey } from '@/config';
import { UserRoles } from '@/constants/enum';
import { User } from '@/interfaces/user.interface';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const context = ({ req }: { req: Request }) => {
  const token = req.headers.authorization || '';

  console.log('>>>>>..token', token);

  // const decoded = jwt.verify(token, jwtSecretKey) as User;

  // ------- testing
  const decoded = {
    roles: [
      {
        role: {
          name: UserRoles.ADMIN,
        },
      },
    ],
  };
  // Decode token, get user info if needed
  return { token, user: decoded };
};
