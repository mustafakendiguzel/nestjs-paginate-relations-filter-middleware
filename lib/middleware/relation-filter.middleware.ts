import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RelationFilterMiddleware implements NestMiddleware {
  public relations = [];
  public filters = [];

  use(req: Request, res: Response, next: NextFunction) {
    this.relations = []; // Make empty in all request
    this.filters = []; // Make empty in all Request
    const [endPointUrl, originalUrl] = req.originalUrl.split("?");

    const errorMessage = (whereFilterRelation: string) => {
      const wrongUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
      const correctUrl = `${req.protocol}://${req.get(
        "Host"
      )}${endPointUrl}?relations=${whereFilterRelation}&${originalUrl}`;
      const errorMesage = `You need to type the Relation of the Filter you type. Example; WrongLink: ${wrongUrl}, CorrectLink: ${correctUrl}`;
      return errorMesage;
    };

    if (originalUrl) {
      originalUrl.split("&").map((element) => {
        // Relations
        if (element.includes("relations=")) {
          const [__, relation] = element.split("=");
          if (relation.includes(",")) {
            // More Than One Relation
            relation.split(",").map((relationElement) => {
              this.relations.push(relationElement);
            });
          } else {
            // Only One Relation
            this.relations.push(relation);
          }
        } else {
          this.filters.push(element);
        }
      });
    }

    if (this.filters.length) {
      this.filters.map((filterElement: string) => {
        const filteredElement = filterElement.split(".");
        const filterSize = filteredElement.length;
        const minReqFilterSize = 3;
        if (filterSize >= minReqFilterSize) {
          const whereFilterRelation = filteredElement[1];
          if (!this.relations.includes(whereFilterRelation)) {
            throw new BadRequestException(errorMessage(whereFilterRelation));
          }
        }
      });
    }
    next();
  }
}
