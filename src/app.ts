import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { GraphQLSchema } from "graphql";
import Mutation from "./resolvers/mutations/mutation";
import { graphqlHTTP } from "express-graphql";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import Query from "./resolvers/queries/query";
import path from "path";
import AuthService from "./services/auth.service";
import UserRepository from "./repositories/user.repository";
import User from "./models/user";
import UserOutputDto from "./dtos/users/user.output.dto";

dotenv.config();

const FRONTEND_URL: string = process.env.FRONTEND_URL as string;
const MAX_FILE_SIZE_UPLOAD: number = 10000000;
const MAX_FILE_UPLOAD: number = 10;

const app = express();
app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/graphql",
  graphqlUploadExpress({
    maxFileSize: MAX_FILE_SIZE_UPLOAD,
    maxFiles: MAX_FILE_UPLOAD
  }),
  graphqlHTTP(async (request) => {
    const token: string | undefined = request.headers.authorization?.split(" ")[1];
    let user: User | null = null;

    if (token) {
      try {
        const authService = new AuthService();
        const userRepository = new UserRepository();
  
        const userOutput: UserOutputDto = await authService.decodeToken(token);
        user = await userRepository.get(userOutput.id);
      }
      catch (error) {}
    }

    return {
      schema: schema,
      graphiql: {
        headerEditorEnabled: true 
      },
      context: {
        request,
        user
      }
    }
  }
));

(async () => {
  await connectToDatabase();
})();

export default app;
