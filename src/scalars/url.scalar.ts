import { GraphQLScalarType } from "graphql";

const UrlScalar = new GraphQLScalarType({
  name: "URL",
  description: "A valid URL",
  serialize(value: any) {
    try {
      const url = new URL(value);
      return url.toString();
    }
    catch {
      throw new Error("INVALID_URL");
    }
  },
  parseValue(value: any) {
    try {
      const url = new URL(value);
      return url.toString();
    }
    catch {
      throw new Error("INVALID_URL");
    }
  },
  parseLiteral(ast) {
    if (ast.kind !== "StringValue") {
      throw new Error("INVALID_URL");
    }
    try {
      const url = new URL(ast.value);
      return url.toString();
    }
    catch {
      throw new Error("INVALID_URL");
    }
  },
});

export default UrlScalar;
