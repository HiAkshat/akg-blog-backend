import { User } from '@/interfaces/user.interface';
import { rule } from 'graphql-shield';

export default class AuthMiddleware {
  public verifyToken = rule()((_parent, _args, context) => {
    const user = context.user as User;
    return Boolean(user)
  });
}
