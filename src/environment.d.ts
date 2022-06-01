import { Request } from "express";
import { Secret } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken/index";

// declare namespace custom {
interface customRequest extends Request {
    custom?: {
      req_uuid: string;
      user?: {
        id: number;
      }
    };
    
    files?: any
  }
// }
export default customRequest;
