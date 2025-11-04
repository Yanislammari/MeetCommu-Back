import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
import EmailScalar from "../scalars/email.scalar";
import PasswordScalar from "../scalars/password.scalar";
import RoleEnum from "../enums/role.enum";
import VisibilityEnum from "../enums/visibility.enum";
import UrlScalar from "../scalars/url.scalar";
import DateTimeScalar from "../scalars/datetime.scalar";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User of the platform",
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLID)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    username: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    email: { 
      type: new GraphQLNonNull(EmailScalar)
    },
    password: { 
      type: new GraphQLNonNull(PasswordScalar)
    },
    role: { 
      type: new GraphQLNonNull(RoleEnum)
    },
    visibility: {
      type: new GraphQLNonNull(VisibilityEnum)
    },
    profilePictureUrl: {
      type: UrlScalar
    },
    createdAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    },
    updatedAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    }
  })
});

export default UserType;
