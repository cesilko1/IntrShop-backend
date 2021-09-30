import mongoose from 'mongoose';
import { Request } from 'express';

export default interface IUser {
	email: string;
	password: string;
	createdAt: Date;
	privileges: number;
}

export interface IUserDocument extends IUser, mongoose.Document {
	comparePassword(password: string): Promise<boolean>;
}

export interface IUserRequest extends Request {
	user?: IUserDocument;
}