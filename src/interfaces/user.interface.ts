// Constants
import { User as UserType } from '@prisma/client';


export interface Roles {
  role: {
    id: string;
    name: string;
  };
};

export type User<T extends keyof UserType = keyof UserType> = Pick<UserType, T> & {roles: Roles[]};
