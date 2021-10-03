import { Response, NextFunction } from "express";
import Config from "../config";
import users from "../models/User.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserRequest } from "../interfaces/User";

const verifyToken = async (req: IUserRequest, res: Response, next: NextFunction) => {
	const token = req.headers.token as string;
	var verifiedToken: string | JwtPayload;

	if(!token) res.status(401).send('Uživatel není přihlášen.');

	try {
		verifiedToken = await jwt.verify(token, Config.token) as {_id: string};
	}
	catch(error) {
		return res.status(401).send('Uživatel není přihlášen.');
	}

	try {
		const user = await users.findById(verifiedToken._id);
		if(user) req.user = user;
		else return res.status(401).send('Uživatel není přihlášen.');
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}

	next();
}

export default verifyToken;