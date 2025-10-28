import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLObjectType } from "graphql";
import UrlScalar from "../scalars/url.scalar";
import UserType from "./user.type";
import { GraphQLList } from "graphql";
import DateTimeScalar from "../scalars/datetime.scalar";

const CommunityType = new GraphQLObjectType({
  name: "Community",
  description: "A community within the platform",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    pictureUrl: {
      type: UrlScalar
    },
    creator: {
      type: new GraphQLNonNull(UserType)
    },
    admins: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType)))
    },
    createdAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    },
    updatedAt: {
      type: new GraphQLNonNull(DateTimeScalar)
    }
  })
});

export default CommunityType;
