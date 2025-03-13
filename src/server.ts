import App from '@/app';
import { protectedGraphqlSchema } from "./graphql/schema";
import { context } from "./graphql/context";

const app = new App(protectedGraphqlSchema, context);

app.listen();
