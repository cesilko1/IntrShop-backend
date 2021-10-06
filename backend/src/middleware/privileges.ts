import { NextFunction, Response } from "express";
import { IUserRequest } from "../interfaces/User";

const error = (res: Response) => {res.sendStatus(500); throw new Error("req.user not provided!");}
const unauthorized = (res: Response) => {return res.status(401).send('Nemáte patřičná oprávnění.');}

const admin = async (req: IUserRequest, res: Response, next: NextFunction) => {
	if(!req.user) return error(res);
	if(req.user.privileges > 0) return unauthorized(res);
	next();
}

const guest = async (req: IUserRequest, res: Response, next: NextFunction) => {
	if(!req.user) return error(res);
	if(req.user.privileges > 1) return unauthorized(res);
	next();
}

export default { admin, guest }
