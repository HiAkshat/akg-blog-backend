import prisma from '@/databases';
import { boolean } from 'zod';

export default class UserDao {
  private postsModel = prisma.user;

  public getUserByUsername = async (username: string) => {
    const a = await this.postsModel.findUnique({
      where: { username },
      select: { username: true, roles: {select: {role: true}} },
    });
  };
}
