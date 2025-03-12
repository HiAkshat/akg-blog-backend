import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config, { port, gcpRoute } from '@config';
import { Routes } from '@/interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
// import { logger } from '@utils/logger';
// import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import { NotFoundError } from '@exceptions/NotFoundError';
import { GraphQLSchema } from 'graphql';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
// import { Logger } from 'winston';

const NODE_ENV = config.NODE_ENV;

class App {
  public app: Application;
  public env: string;
  public port: string | number;
  private server: ApolloServer<ExpressContext>

  constructor(graphqlSchema: GraphQLSchema, context: Function) {
    this.env = NODE_ENV || 'development';
    this.port = port || 3000;
    this.app = express();

    this.app.enable('trust proxy');
    this.initializeMiddlewares();

    this.server = new ApolloServer({schema: graphqlSchema, context, introspection: true })
  }

  public listen() {
    this.server.start().then(() => {
      this.server.applyMiddleware({app: this.app as any})
    })

    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
  }

  private initializeMiddlewares() {
    /**
     * Override the x-forwarded-proto header with custom x-forwarded-proto header if needed.
     * When node instance is behind an ALB, the x-forwarded-proto is overriden with an incorrect scheme,
     * x-wm-forwarded-proto is used to get the actual scheme value.
     */
    const validProto = ['http', 'https'];
    const CUSTOM_PROTO_KEY = 'x-wm-forwarded-proto';
    this.app.use((req, res, next) => {
      const proxiedProto = req.headers[CUSTOM_PROTO_KEY];
      if (typeof proxiedProto === 'string' && validProto.indexOf(proxiedProto.toLowerCase()) !== -1) {
        req.headers['x-forwarded-proto'] = proxiedProto;
      }
      next();
    });

    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.connectToDatabase();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    //this.initializeSwagger();
    // this.initializeErrorHandling();
  }

  // private initializeErrorHandling() {
  //   this.app.use(errorMiddleware);
  // }
}

export default App;
