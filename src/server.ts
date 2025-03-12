import App from '@/app';
import { graphqlSchema } from "./graphql/schema";
import { context } from "./graphql/context";

const app = new App(graphqlSchema, context);

app.listen();
