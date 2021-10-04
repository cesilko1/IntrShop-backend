import { Request, Response } from 'express';
import users from '../models/User.model';
import loginValidation from '../validation/Login.validation';
import registerValidation from '../validation/Register.validation';
import ChangePasswordValidation from '../validation/ChangePassword.validation';
import emailValidation from '../validation/Email.validation';
import { IUserDocument } from '../interfaces/User';
import { IUserRequest } from '../interfaces/User';
import jwt from 'jsonwebtoken';
import Config from '../config';


const getUserInfo = async (req: IUserRequest, res: Response) => {
	if(!req.user) return res.sendStatus(404);
	res.status(200).json({_id: req.user._id, email: req.user.email, privileges: req.user.privileges, createdAt: req.user.createdAt});
}

const login = async (req: Request, res: Response) => {
	if(loginValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');

	var user: IUserDocument | null;

	try {
		user = await users.findOne({email: req.body.email});
	}
	catch(error) {
		return res.status(403).send("Špatný email nebo heslo.");
	}

	if(!user || !await user.comparePassword(req.body.password)) return res.status(403).send("Špatný email nebo heslo.");

	const token = jwt.sign({_id: user._id}, Config.token);

	res.header('token', token).status(200).json({_id: user._id, email: user.email, privileges: user.privileges, createdAt: user.createdAt});
}

const register = async (req: Request, res: Response) => {
	if(registerValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');
	if(await (await emailValidation(req.body.email)).valid === false) return res.status(400).send('Tento email je neplatný.');

	try {
		await new users(req.body).save();
		res.status(201).send("Uživatel úspěšně zaregistován.");
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const updatePassword = async (req: IUserRequest, res: Response) => {
	if(ChangePasswordValidation(req.body).error) return res.status(400).send('Nastala chyba při validaci dat.');
	if(!req.user?.comparePassword(req.body.password)) return res.status(401).send('Špatné heslo');

	try {
		await users.findByIdAndUpdate(req.user._id, {password: req.body.password});
		res.status(200).send("Heslo bylo úspěšně změněno");
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const updateEmail = async (req: IUserRequest, res: Response) => {
	if(await (await emailValidation(req.body.email)).valid === false) return res.status(400).send('Tento email je neplatný.');

	try {
		await users.findByIdAndUpdate(req.user?._id, {email: req.body.email});
		res.status(200).send('Email byl úspěšně změněn.');
	}
	catch(error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export default { login, register, updatePassword, updateEmail, getUserInfo }