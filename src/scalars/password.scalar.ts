import { GraphQLScalarType } from "graphql";

const PasswordScalar = new GraphQLScalarType({
  name: "Password",
  description: "A valid password with at least 8 characters, including letters and numbers",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    if (typeof value !== "string" || value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
      throw new Error("INVALID_PASSWORD");
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== "StringValue" || ast.value.length < 8 || !/\d/.test(ast.value) || !/[a-zA-Z]/.test(ast.value)) {
      throw new Error("INVALID_PASSWORD");
    }
    return ast.value;
  }
});

export default PasswordScalar;
