import { GraphQLScalarType } from "graphql";

const EmailScalar = new GraphQLScalarType({
  name: "Email",
  description: "A valid email address",
  serialize(value) {
    return value.toLowerCase();
  },
  parseValue(value) {
    if (typeof value !== "string" || !value.includes("@")) {
      throw new Error("INVALID_EMAIL_ADDRESS");
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== "StringValue" || !ast.value.includes("@")) {
      throw new Error("INVALID_EMAIL_ADDRESS");
    }
    return ast.value;
  },
});

export default EmailScalar;
