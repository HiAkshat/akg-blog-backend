import { PrismaClient } from '@prisma/client';
import { database } from '@/config';
import { IConnection } from '@/typings/config';

const dbConfig = database;

const getDatabaseConnectionString = (client: string, connection: IConnection) => {
  const { user, password, host, port, name } = connection;

  return `${client}://${user}:${password}@${host}:${port}/${name}?schema=public`;
};

const prisma = new PrismaClient();

export default prisma;
