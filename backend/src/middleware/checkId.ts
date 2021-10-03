import { Request, Response, NextFunction } from "express";

const checkId = async (req: Request, res: Response, next: NextFunction) => {
	if(!req.params.id) return res.status(400).send('Undefined ID in request');

	next();
}

export default checkId;