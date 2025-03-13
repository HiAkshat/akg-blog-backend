import { and } from 'graphql-shield';
// Controllers
import UserController from '@/controllers/user.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';
import UserPolicies from '@/middlewares/policies/user.policies';
export default class UserResolvers {
  private userController = new UserController();
  private authMiddleware = new AuthMiddleware();
  private userPolicies = new UserPolicies();

  public getResolvers = () => {
    return {
      Query: {
        users: this.userController.getAllUsers,
      },

      Mutation: {
        createUser: this.userController.createNewUser,
      },
    };
  };

  public getPermissions = () => {
    return {
      Query: {
        users: and(this.authMiddleware.verifyToken, this.userPolicies.canAddUser),
      },
      Mutation: {},
    };
  };
}
