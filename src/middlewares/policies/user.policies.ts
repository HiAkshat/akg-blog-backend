import { UserRoles } from '@/constants/enum';
import { User } from '@/interfaces/user.interface';
import { rule } from 'graphql-shield';

export default class UserPolicies {
  public canAddUser = rule()((_parent, _args, context) => {
    const user = context.user as User;
    console.log(">>>>>>>user", user)
    return user.roles.some(role => role.role.name === UserRoles.ADMIN);
  });
}
