// Constants
import { User as UserType } from '@prisma/client';

export type User<T extends keyof UserType = keyof UserType> = Pick<UserType, T>
