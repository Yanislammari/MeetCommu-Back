import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import dotenv from "dotenv";
import UserRepository from "../repositories/user.repository";
import User from "../models/user";
import Role from "../models/role";
import Visibility from "../models/visibility";
import jwt from "jsonwebtoken";

dotenv.config();

const OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID as string;
const SECRET_KEY: string = process.env.SECRET_KEY as string;

class GoogleOAuthService {
  private readonly googleOAuthClient: OAuth2Client;
  private readonly userRepository: UserRepository;

  constructor() {
    this.googleOAuthClient = new OAuth2Client(OAUTH_CLIENT_ID);
    this.userRepository = new UserRepository();
  }

  public async loginWithGoogle(idToken: string): Promise<string> {
    const ticket: LoginTicket = await this.googleOAuthClient.verifyIdToken({
      idToken: idToken,
      audience: OAUTH_CLIENT_ID
    });

    const payload: TokenPayload | undefined = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error("GOOGLE_AUTH_FAILED");
    }

    let user: User | null = await this.userRepository.getByEmail(payload.email);
    if (!user) {
      const newUser: User = {
        id: "",
        firstName: payload.given_name || payload.name?.split(" ")[0] || "",
        lastName: payload.family_name || payload.name?.split(" ")[1] || "",
        username: payload.email.split("@")[0],
        email: payload.email,
        password: {
          hash: "",
          salt: ""
        },
        role: Role.USER,
        visibility: Visibility.PUBLIC,
        profilePictureUrl: payload.picture || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      user = await this.userRepository.create(newUser);
    }

    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "7d" });
  }
}

export default GoogleOAuthService;
