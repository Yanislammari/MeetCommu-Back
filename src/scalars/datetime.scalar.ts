import { GraphQLScalarType } from "graphql";

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid ISO 8601 date-time string",
  serialize(value: any) {
    if (!(value instanceof Date)) {
      throw new Error("INVALID_DATE");
    }
    return value.toISOString();
  },
  parseValue(value: any) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("INVALID_DATE");
    }
    return date;
  },
  parseLiteral(ast) {
    if (ast.kind !== "StringValue") {
      throw new Error("INVALID_DATE");
    }
    const date = new Date(ast.value);
    if (isNaN(date.getTime())) {
      throw new Error("INVALID_DATE");
    }
    return date;
  },
});

export default DateTimeScalar;
