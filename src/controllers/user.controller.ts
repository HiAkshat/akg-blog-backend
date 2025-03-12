import UserService from '@/services/user.service';

export default class UserController {
  // Services
  private userService = new UserService();

  public getAllUsers = async (_: any, __: any, context: { token: string }) => {
    console.log('>>>>>>>>>>', context);

    const users = this.userService.getAllUsers();
    return users;
  };

  public createNewUser = async (_: any, { name, email }: { name: string; email: string }) => {
    return 'helllo'
  }
}
