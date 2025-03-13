import prisma from "@/databases";
import { User, Post } from "@prisma/client";

export default class PostsDao {
  private postsModel = prisma.post;

  public createPost = async (post: Post) => {
    const createdPost = await this.postsModel.create({
      data: post,
    });

    return createdPost
  }
}
