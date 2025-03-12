type CreateOptions<T> = {
  [Property in keyof T]+?: T[Property];
};

interface IQueueConfig {
  serviceType: string;
  queueUrl: string;
  topicName: string;
}

export interface IDatabase {
  client: string;
  connection: {
    host: string,
    port: string,
    user: string,
    password: string,
    name: string
  };
}

export interface IServer {
  port: number;
}

interface IReplica {
  host: string;
  port: string;
  user: string;
  password: string;
}

interface IConnection extends IReplica {
  name: string;
}

export interface IDatabaseClient {
  client: string;
  connection: IConnection;
  replicas: IReplica[];
  replset_name: string;
}

//AS OF NOW IT IS EMPTY OBJECT BUT WHEN SERVICES COMES IT WILL BE HERE
export interface IServices {
  attendence_service: string;
}

export interface IEmailConfig {
  user: string;
  pass: string;
}
export interface IConfig {
  NODE_ENV: string;
  LOG_FORMAT: string;
  LOG_DIR: string;
  googleKeys: string;
  is_production: boolean;
  apm_service: { name: string; url: string };
}

export interface IApmService {
  name: string;
  url: string;
}

export type IConfigOptional = CreateOptions<IConfig>;
