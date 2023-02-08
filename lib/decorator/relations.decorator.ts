import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RelationDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request._parsedUrl.query;
    const result = [];
    String(query)
      .split("&")
      .map(function (element) {
        if (element.startsWith("relations")) {
          if (element !== undefined) {
            const values = element.split("=");
            if (values[1].includes(",")) {
              result.push(values[1].split(","));
            } else {
              result.push(values[1]);
            }
          }
        }
      });
    return Array.isArray(result[0]) ? result[0] : result;
  }
);
