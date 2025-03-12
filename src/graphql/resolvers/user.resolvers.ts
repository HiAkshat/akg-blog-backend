// Controllers
import UserController from "@/controllers/user.controller";

export default class UserResolvers {
  private userController = new UserController()

  public getResolvers = () => {
    return {
      Query: {
        users: this.userController.getAllUsers,
      },

      Mutation: {
        createUser: this.userController.createNewUser,
      },
    }
  }
}
